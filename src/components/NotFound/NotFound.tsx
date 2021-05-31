import React from 'react';

import { Image } from 'antd';

import { monkey } from 'assets';

import type { NotFoundType } from './NotFound.container';

const NotFound: React.FC<NotFoundType.Props> = () => {
  return <Image src={monkey} />;
};

export default NotFound;
