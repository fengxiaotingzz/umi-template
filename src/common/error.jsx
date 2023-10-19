import * as React from 'react';

// import {clearCurrentPageRequest} from '@request/interceptor';

class WrapComponent extends React.Component {
  componentWillUnmount() {
    // clearCurrentPageRequest();
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

class DefaultFallback extends React.Component {
  render() {
    return (
      <div>
        出错啦
      </div>
    );
  }
}

export class ErrorBoundary extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {
        message: '',
        stack: '',
        name: ''
      },
      errorInfo: {
        componentStack: ''
      }
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error,
      errorInfo
    });
  }

  render() {
    const {hasError, error, errorInfo} = this.state;
    const FallbackComponent = this.props.FallbackComponent || DefaultFallback;
    return hasError ? (
      <FallbackComponent
        title={error.name}
        componentStack={errorInfo.componentStack}
        errorMessage={error.message}
        stack={error.stack}
      />
    ) : (
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}


export const withErrorBoundary = (
  Component,
  FallbackComponent
) => {
  const Wrapped = (props) => (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <WrapComponent>
        <Component {...props} />
      </WrapComponent>
    </ErrorBoundary>
  );
  return Wrapped;
};