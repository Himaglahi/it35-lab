import { useState, useEffect } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput,
  IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonAlert, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon,
  IonPopover, IonSpinner, IonToast, IonTextarea, IonSearchbar
} from '@ionic/react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, send, ellipsisVertical } from 'ionicons/icons';

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });
  const [searchText, setSearchText] = useState('');

  const [reactions, setReactions] = useState<{ [key: string]: { like: number; heart: number; laugh: number } }>({});

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user) {
        setUser(authData.user);
        const { data: userData } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };

    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      setPosts(data || []);
      setFilteredPosts(data || []);

      const initialReactions: { [key: string]: { like: number; heart: number; laugh: number } } = {};
      (data || []).forEach(post => {
        initialReactions[post.post_id] = { like: 0, heart: 0, laugh: 0 };
      });
      setReactions(initialReactions);
    };

    (async () => {
      await fetchUser();
      await fetchPosts();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.post_content.toLowerCase().includes(searchText.toLowerCase()) ||
      post.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchText, posts]);

  const createPost = async () => {
    if (!postContent.trim() || !user || !username) return;

    const { data: userData } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();

    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    const { data } = await supabase
      .from('posts')
      .insert([{ post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }])
      .select('*');

    if (data) {
      setPosts([data[0], ...posts]);
      setToastMessage('Post created!');
      setPostContent('');
    }
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
    setToastMessage('Post deleted!');
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');

    if (data) {
      const updatedPost = data[0];
      setPosts(posts.map(p => (p.post_id === updatedPost.post_id ? updatedPost : p)));
      setEditingPost(null);
      setPostContent('');
      setIsModalOpen(false);
      setToastMessage('Post updated!');
    }
  };

  const handleReaction = (postId: string, type: 'like' | 'heart' | 'laugh') => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [type]: prev[postId][type] + 1,
      },
    }));
  };

  return (
    <>
      <IonContent fullscreen className="ion-padding">
        {user ? (
          <>
            {/* Single Searchbar sa taas */}
            <IonSearchbar
              value={searchText}
              onIonInput={e => setSearchText(e.detail.value!)}
              placeholder="Search posts or users..."
            />

            {/* Create Post Card */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Create a Post</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="auto">
                      <IonAvatar>
                        <img alt="avatar" src={user.user_metadata?.avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg'} />
                      </IonAvatar>
                    </IonCol>
                    <IonCol>
                      <IonTextarea
                        value={postContent}
                        onIonChange={e => setPostContent(e.detail.value!)}
                        placeholder="What's on your mind?"
                        autoGrow
                      />
                    </IonCol>
                    <IonCol size="auto" className="ion-align-self-end">
                      <IonButton onClick={createPost} shape="round">
                        <IonIcon icon={send} slot="icon-only" />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>

            {/* Post Feed */}
            {isLoading ? (
              <IonSpinner name="crescent" />
            ) : (
              filteredPosts.map(post => (
                <IonCard key={post.post_id} className="animate__animated animate__fadeInUp">
                  <IonCardHeader>
                    <IonRow>
                      <IonCol size="auto">
                        <IonAvatar>
                          <img src={post.avatar_url} alt={post.username} />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonCardTitle>{post.username}</IonCardTitle>
                        <IonCardSubtitle>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                      </IonCol>
                      <IonCol size="auto">
                        <IonButton
                          fill="clear"
                          onClick={e => setPopoverState({ open: true, event: e.nativeEvent, postId: post.post_id })}
                        >
                          <IonIcon icon={ellipsisVertical} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCardHeader>

                  <IonCardContent>
                    <IonText>
                      <p>{post.post_content}</p>
                    </IonText>

                    {/* Reactions */}
                    <IonRow className="ion-justify-content-center ion-padding-vertical">
                      <IonButton fill="clear" onClick={() => handleReaction(post.post_id, 'like')}>
                        👍 {reactions[post.post_id]?.like || 0}
                      </IonButton>
                      <IonButton fill="clear" onClick={() => handleReaction(post.post_id, 'heart')}>
                        ❤️ {reactions[post.post_id]?.heart || 0}
                      </IonButton>
                      <IonButton fill="clear" onClick={() => handleReaction(post.post_id, 'laugh')}>
                        😂 {reactions[post.post_id]?.laugh || 0}
                      </IonButton>
                    </IonRow>
                  </IonCardContent>

                  <IonPopover
                    isOpen={popoverState.open && popoverState.postId === post.post_id}
                    event={popoverState.event}
                    onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
                  >
                    <IonButton fill="clear" onClick={() => { startEditingPost(post); setPopoverState({ open: false, event: null, postId: null }); }}>Edit</IonButton>
                    <IonButton fill="clear" color="danger" onClick={() => { deletePost(post.post_id); setPopoverState({ open: false, event: null, postId: null }); }}>Delete</IonButton>
                  </IonPopover>
                </IonCard>
              ))
            )}
          </>
        ) : (
          <IonSpinner name="dots" />
        )}
      </IonContent>

      {/* Edit Modal */}
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Edit Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonTextarea
            value={postContent}
            onIonChange={e => setPostContent(e.detail.value!)}
            placeholder="Edit your post..."
            autoGrow
          />
        </IonContent>
        <IonFooter className="ion-padding">
          <IonButton expand="block" onClick={savePost}>Save</IonButton>
          <IonButton expand="block" fill="outline" onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
        </IonFooter>
      </IonModal>

      {/* Toast */}
      <IonToast
        isOpen={!!toastMessage}
        onDidDismiss={() => setToastMessage('')}
        message={toastMessage}
        duration={2000}
        color="success"
      />
    </>
  );
};

export default FeedContainer;
