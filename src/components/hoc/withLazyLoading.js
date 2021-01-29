import React, { Suspense } from 'react';

const withLazyLoading = (Component) => {
  return (props) => {
    return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default withLazyLoading;
