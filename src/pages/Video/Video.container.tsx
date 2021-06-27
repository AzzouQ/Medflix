import Loading from 'components/Loading';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { database } from 'service/firebase';
import { userSelectors, UserState } from 'slices/user.slice';
import type { UserType, VideoType } from 'types';
import Video from './Video';
import { message } from 'antd';
import { t } from 'i18n';

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

  const vid = video?.objectID;
  const uid = user?.uid;

  useEffect(() => {
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
    }
  }, [isFocus, id]);

  useEffect(() => {
    const getReport = () => {
      setReportLoading(true);
      const report = database.ref(`/users/${uid}/report`);
      report
        .once('value')
        .then((data) => {
          if (data.val()) {
            if (data.val().includes(vid)) setIsReport(true);
          } else setIsReport(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setReportLoading(false);
        });
    };

    const getLike = () => {
      setLikeLoading(true);
      const like = database.ref(`/users/${uid}/like`);
      like
        .once('value')
        .then((data) => {
          if (data.val()) {
            if (data.val().includes(vid)) setIsLiked(true);
          } else setIsLiked(false);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLikeLoading(false);
        });
    };

    if (uid && vid) {
      getLike();
      getReport();
    }
  }, [uid, vid]);

  useEffect(() => {
    if (vid) {
      const listenLike = database.ref(`/videos/${vid}/like`);
      const listenReport = database.ref(`/videos/${vid}/report`);
      const listenView = database.ref(`/videos/${vid}/view`);

      listenLike.on('value', (snap) => {
        const newValue: number = snap.val();
        if (newValue != null) {
          setVideo((values) => ({ ...values!, like: newValue }));
        }
      });

      listenReport.on('value', (snap) => {
        const newValue: number = snap.val();
        if (newValue != null)
          setVideo((values) => ({ ...values!, report: newValue }));
      });

      listenView.on('value', (snap) => {
        const newValue: number = snap.val();
        if (newValue != null)
          setVideo((values) => ({ ...values!, view: newValue }));
      });

      return () => {
        listenLike.off();
        listenReport.off();
        listenView.off();
      };
    }
  }, [vid]);

  const report = () => {
    const videoId = vid!;
    const uid = user!.uid;
    setReportLoading(true);
    const videoRef = database.ref();
    videoRef
      .transaction((post) => {
        if (post) {
          if (!post.users[uid].report) post.users[uid].report = [];
          post.users[uid].report.push(videoId);
          post.videos[videoId].report++;
        }
        return post;
      })
      .then((response) => {
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
    const videoId = vid!;
    const uid = user!.uid;

    setReportLoading(true);
    const videoRef = database.ref();
    videoRef
      .transaction((post) => {
        if (post) {
          if (!post.users[uid].report) post.users[uid].report = [];
          const vIndex = post.users[uid].report.indexOf(videoId);
          if (vIndex > -1) {
            post.users[uid].report.splice(vIndex, 1);
            post.videos[videoId].report--;
          }
        }
        return post;
      })
      .then((response) => {
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
    const videoId = vid!;
    const uid = user!.uid;
    setLikeLoading(true);
    const videoRef = database.ref();
    videoRef
      .transaction((post) => {
        if (post) {
          if (!post.users[uid].like) post.users[uid].like = [];
          post.users[uid].like.push(videoId);
          post.videos[videoId].like++;
        }
        return post;
      })
      .then((response) => {
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
    const videoId = vid!;
    const uid = user!.uid;

    setLikeLoading(true);
    const videoRef = database.ref();
    videoRef
      .transaction((post) => {
        if (post) {
          if (!post.users[uid].like) post.users[uid].like = [];
          const vIndex = post.users[uid].like.indexOf(videoId);
          if (vIndex > -1) {
            post.users[uid].like.splice(vIndex, 1);
            post.videos[videoId].like--;
          }
        }
        return post;
      })
      .then((response) => {
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
      message.error(t`watch.reportUserError`);
      return;
    }
    if (!video) {
      message.error(t`watch.errorLoadingData`);
      return;
    }

    if (isReport) unreport();
    else report();
  };

  const onLike = () => {
    if (!user) {
      message.error(t`watch.likeUserError`);
      return;
    }
    if (!video) {
      message.error(t`watch.errorLoadingData`);
      return;
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
    if (isFocus && video?.owner) {
      getUserData(video.owner);
    }
  }, [user, isFocus, video?.owner]);

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
