import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { database } from 'service/firebase';
import { userSelectors, UserState } from 'slices/user.slice';
import type { UserType, VideoType } from 'types';
import Video from './Video';
import { message } from 'antd';

export declare namespace VideoView {
  type Props = {
    user?: UserState;
    video: VideoType;
    userData?: UserType;
    onReport: () => void;
    onLike: () => void;
    likeLoading: boolean;
    isLiked: boolean;
    reportLoading: boolean;
    isReport: boolean;
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
  const [likeLoading, setLikeLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [isReport, setIsReport] = useState(false);
  useEffect(() => {
    const getReport = (uid: string) => {
      setReportLoading(true);
      const report = database.ref(`/users/${uid}/report`);
      report
        .once('value')
        .then((data) => {
          if (data.val()) {
            if (data.val().includes(video?.objectID)) setIsReport(true);
          } else setIsReport(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setReportLoading(false);
        });
    };

    const getLike = (uid: string) => {
      setLikeLoading(true);
      const like = database.ref(`/users/${uid}/like`);
      like
        .once('value')
        .then((data) => {
          if (data.val()) {
            if (data.val().includes(video?.objectID)) setIsLiked(true);
          } else setIsLiked(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLikeLoading(false);
        });
    };

    const getVideo = async (id: string) => {
      const videoSnap = await database.ref(`/videos/${id}`).get();
      if (videoSnap.val()) {
        setVideo({ ...videoSnap.val(), objectID: videoSnap.key });
      } else {
        setVideo(undefined);
      }
    };
    if (isFocus && id) {
      getVideo(id);
      if (user) getLike(user?.uid);
      if (user) getReport(user?.uid);
    }
  }, [user, isFocus, id, video?.objectID]);

  const report = () => {
    const videoId = video!.objectID;
    const uid = user!.uid;
    let reportCount: number;
    setReportLoading(true);
    const videoRef = database.ref();
    videoRef
      .transaction((post) => {
        if (post) {
          reportCount = post.videos[videoId].report++;
          if (!post.users[uid].report) post.users[uid].report = [];
          post.users[uid].report.push(videoId);
        }
        return post;
      })
      .then((response) => {
        reportCount++;
        const newState: VideoType = { ...video!, report: reportCount };
        setVideo(newState);
        setIsReport(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setReportLoading(false);
      });
  };

  const unreport = () => {
    const videoId = video!.objectID;
    const uid = user!.uid;

    let reportCount: number;

    setReportLoading(true);
    const videoRef = database.ref();
    videoRef
      .transaction((post) => {
        if (post) {
          reportCount = post.videos[videoId].report--;
          if (!post.users[uid].report) post.users[uid].report = [];
          const vIndex = post.users[uid].report.indexOf(videoId);
          if (vIndex > -1) post.users[uid].report.splice(vIndex, 1);
        }
        return post;
      })
      .then((response) => {
        reportCount--;
        const newState: VideoType = { ...video!, report: reportCount };
        setVideo(newState);
        setIsReport(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setReportLoading(false);
      });
  };

  const like = () => {
    const videoId = video!.objectID;
    const uid = user!.uid;
    let likeCount: number;
    setLikeLoading(true);
    const videoRef = database.ref();
    videoRef
      .transaction((post) => {
        if (post) {
          likeCount = post.videos[videoId].like++;
          if (!post.users[uid].like) post.users[uid].like = [];
          post.users[uid].like.push(videoId);
        }
        return post;
      })
      .then((response) => {
        likeCount++;
        const newState: VideoType = { ...video!, like: likeCount };
        setVideo(newState);
        setIsLiked(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLikeLoading(false);
      });
  };

  const unlike = () => {
    const videoId = video!.objectID;
    const uid = user!.uid;

    let likeCount: number;

    setLikeLoading(true);
    const videoRef = database.ref();
    videoRef
      .transaction((post) => {
        if (post) {
          likeCount = post.videos[videoId].like--;
          if (!post.users[uid].like) post.users[uid].like = [];
          const vIndex = post.users[uid].like.indexOf(videoId);
          if (vIndex > -1) post.users[uid].like.splice(vIndex, 1);
        }
        return post;
      })
      .then((response) => {
        likeCount--;
        const newState: VideoType = { ...video!, like: likeCount };
        setVideo(newState);
        setIsLiked(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLikeLoading(false);
      });
  };
  const onReport = () => {
    if (!user) {
      message.error('Vous devez être connecté pour signaler une vidéo');
    }
    if (!video) {
      message.error('Il y a un problème...');
    }

    if (isReport) unreport();
    else report();
  };

  const onLike = () => {
    if (!user) {
      message.error('Vous devez être connecté pour liker une vidéo');
    }
    if (!video) {
      message.error('Il y a un problème...');
    }
    if (isLiked) unlike();
    else like();
  };
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
  return (
    <Video
      {...{
        user,
        video,
        userData,
        onReport,
        onLike,
        likeLoading,
        isLiked,
        reportLoading,
        isReport,
      }}
    />
  );
};

export default VideoContainer;
