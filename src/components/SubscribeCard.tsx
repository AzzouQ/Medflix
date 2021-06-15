import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'antd';
import { t } from 'i18n';

import { database, pushMessaging } from 'service/firebase';
import { UserType } from 'types';
import { useSelector } from 'react-redux';
import { userSelectors } from 'slices';

type Props = {
  userData: UserType;
};

const SubscribeCard: React.FC<Props> = ({ userData }) => {
  const user = useSelector(userSelectors.getUser);
  const [isFollow, setFollow] = useState<boolean>(false);

  const onFollow = useCallback(() => {
    if (!user?.uid) {
      throw new Error('User disconnect');
    }
    return database.ref(`/users/`).transaction((snapshot) => {
      if (snapshot) {
        if (!snapshot[userData.uid].subscribers)
          snapshot[userData.uid].subscribers = [user?.uid];
        else
          snapshot[userData.uid].subscribers = new Set([
            ...snapshot[userData.uid].subscribers,
            user?.uid,
          ]);
        if (!snapshot[user?.uid].subscriptions)
          snapshot[user?.uid].subscriptions = [userData.uid];
        else
          snapshot[user?.uid].subscriptions = new Set([
            ...snapshot[user?.uid].subscriptions,
            userData.uid,
          ]);
        snapshot[user?.uid].subscriptionsCount =
          snapshot[user?.uid]?.subscriptions?.length || 0;
        snapshot[userData.uid].subscribersCount =
          snapshot[userData.uid]?.subscribers?.length || 0;
      }
      return snapshot;
    });
  }, [user, userData]);

  const onUnfollow = useCallback(() => {
    if (!user?.uid) {
      throw new Error('User disconnect');
    }
    return database.ref(`/users/`).transaction((snapshot) => {
      if (snapshot) {
        const subscribers = snapshot[userData.uid].subscribers.filter(
          (sub: string) => sub !== user?.uid
        );
        snapshot[userData.uid].subscribers = subscribers;

        const subscriptions = snapshot[user?.uid].subscriptions.filter(
          (sub: string) => sub !== userData.uid
        );
        snapshot[user?.uid].subscriptions = subscriptions;

        snapshot[user?.uid].subscriptionsCount =
          snapshot[user?.uid]?.subscriptions?.length || 0;
        snapshot[userData.uid].subscribersCount =
          snapshot[userData.uid]?.subscribers?.length || 0;
      }
      return snapshot;
    });
  }, [user, userData]);

  useEffect(() => {
    const getFollow = async () => {
      try {
        const subscriptions = await database
          .ref(`/users/${user?.uid}/subscriptions`)
          .once('value');
        if (subscriptions.val() && subscriptions.val().includes(userData.uid)) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFollow();
  }, [user, userData]);

  return (
    <Button
      type={'primary'}
      style={{ marginRight: 20 }}
      onClick={() => {
        if (isFollow) {
          console.log('Stop follow');
          onUnfollow();
          setFollow(false);
        } else {
          console.log('Start follow');
          onFollow();
          setFollow(true);
          pushMessaging(userData.uid);
        }
      }}
    >
      {isFollow ? t`subscriptions.unsubscribe` : t`subscriptions.subscribe`}
    </Button>
  );
};

export default SubscribeCard;
