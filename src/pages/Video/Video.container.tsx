import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { database } from 'service/firebase';
import { userSelectors, UserState } from 'slices/user.slice';
import type { UserType, VideoType } from 'types';
import Video from './Video';

export declare namespace VideoView {
  type Props = {
    user?: UserState;
    video: VideoType;
    userData?: UserType;
  };
}

interface VideoLocation {
  id: string;
}

const VideoContainer: React.FC = () => {
  const [userData, setUserData] = useState(undefined);
  const { id } = useParams<{ id: string }>();
  const user = useSelector(userSelectors.getUser);
  const [video, setVideo] = useState<VideoType>();
  const { pathname } = useLocation<VideoLocation>();
  const isFocus = pathname.startsWith('/watch/');

  useEffect(() => {
    const getVideo = async (id: string) => {
      const videoSnap = await database.ref(`/videos/${id}`).get();
      if (videoSnap.val()) {
        setVideo({ ...videoSnap.val(), vid: videoSnap.key });
      } else {
        setVideo(undefined);
      }
    };
    if (isFocus && id) {
      getVideo(id);
    }
  }, [user, isFocus, id]);

  useEffect(() => {
    const getUserData = async (urlId: string) => {
      try {
        const user = await database.ref(`/users/${urlId}`).get();
        if (!user.val()) {
          setUserData(undefined);
        } else {
          setUserData({ ...user.val(), uid: user.key });
        }
      } catch (err) {
        setUserData(undefined);
        console.log(err);
        //TODO Handle invalid urlId
      }
    };
    if (isFocus && video) {
      getUserData(video.owner);
    }
  }, [user, isFocus, video]);

  if (!userData || !video) return <Loading text={'Loading video data...'} />;
  return <Video {...{ user, video, userData }} />;
};

export default VideoContainer;
