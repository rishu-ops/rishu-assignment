'use client';

import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

function Profile() {

  const { user, isLoading } = useUser();

  useEffect(() => {
     console.log("user->" , user);
     
  } , [user]) 

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left" data-testid="profile">
            <Col md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                decode="async"
                data-testid="profile-picture"
              />
            </Col>
            <Col md>
              <h2 data-testid="profile-name">{user.name}</h2>
              <p className="lead text-muted" data-testid="profile-email">
                {user.email}
              </p>
            </Col>
          </Row>
          <Row data-testid="profile-details">
            <Col>
              <h3>User Details:</h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.nickname}@gmail.com</p>
              
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
