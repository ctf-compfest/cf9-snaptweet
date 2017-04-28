import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';

import Card from './Card';

export default ({ post }) => {
  const { body, author, created_at, expired_on } = post;
  return (
    <Card>
      <CardHeader>
        <Link to={`/profile/${author.username}`}>{author.username}</Link>
        ·
        <span>{moment(created_at).fromNow()}</span>
        ·
        <span>expired {moment(expired_on).fromNow()}</span>
      </CardHeader>
      <CardBody>{body}</CardBody>
    </Card>
  );
};

const CardBody = styled.div`
  font-size: 1.4rem;
`;

const CardHeader = styled.div`
  font-size: 1rem;
  line-height: 1.2;
  border-bottom: 1px solid rgba(0,0,0,.1);
  margin-bottom: 1rem;
  padding-bottom: .5rem;
  font-family: ${props => props.theme.headingFont};

  a {
    text-decoration: none;
    color: ${props => props.theme.alt};
  }

  * {
    margin: .5rem;
  }
`;
