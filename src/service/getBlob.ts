import { RcFile } from 'antd/lib/upload';

const getBlob = (uri: string | Blob | RcFile) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (e) => {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri as string, true);
    xhr.send(null);
  });

export default getBlob;
