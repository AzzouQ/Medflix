export type VideoType = {
  title: string;
  preview: string;
  url: string;
};

export type VideosType = VideoType[];

export const videos = [
  {
    title: 'Video name',
    preview: 'https://picsum.photos/400/200',
    url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51',
  },
  {
    title: 'Video name',
    preview: 'https://picsum.photos/400/200',
    url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51',
  },
  {
    title: 'Video name',
    preview: 'https://picsum.photos/400/200',
    url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51',
  },
  {
    title: 'Video name',
    preview: 'https://picsum.photos/400/200',
    url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51',
  },
  {
    title: 'Video name',
    preview: 'https://picsum.photos/400/200',
    url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51',
  },
  {
    title: 'Video name',
    preview: 'https://picsum.photos/400/200',
    url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51',
  },
  {
    title: 'Video name',
    preview: 'https://picsum.photos/400/200',
    url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51',
  },
];

export type UserType = {
  name: string;
};

export const user = {
  name: 'Bastien',
};

export const notification = {
  notification: {
    body: 'Allez vite le follow back',
    title: 'Vous avez un nouvel abonné',
  },
  data: {
    body: 'Allez vite le follow back',
    title: 'Vous avez un nouvel abonné',
    key_1: 'Value for key_1',
    key_2: 'Value for key_2',
  },
};
