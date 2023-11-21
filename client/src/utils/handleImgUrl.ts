const handleImgUrl = (src: string) => {
  return 'https://showmethemoney.p-e.kr/' + src.split('3.35.118.28:5000')[1];
};

export default handleImgUrl;
