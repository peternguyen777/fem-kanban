import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <div id='mobMenu-root' />
          <div id='viewTask-root' />
          <div id='addTask-root' />
          <div id='editTask-root' />
          <div id='deleteTask-root' />
          <div id='addBoard-root' />
          <div id='editBoard-root' />
          <div id='deleteBoard-root' />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
