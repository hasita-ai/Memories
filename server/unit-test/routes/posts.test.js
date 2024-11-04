import app from '../../index.js';
import request from 'supertest';
import PostMessage from '../../models/postMessage.js';
import sinon from 'sinon';
import { expect } from 'chai';

describe('Post Routes', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all posts on GET /posts', async () => {
    const mockPosts = [{ title: 'Post1' }, { title: 'Post2' }];
    sinon.stub(PostMessage, 'find').resolves(mockPosts);

    const response = await request(app).get('/posts');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(mockPosts);
  });

  it('should create a post on POST /posts', async () => {
    const newPost = { title: 'Test Post', message: 'This is a test' };
    const savedPost = {
      ...newPost,
      _id: '6719730d72c91bd1a683b996',
      createdAt: new Date(),
      likeCount: 0,
      tags: [],
    };
  
    sinon.stub(PostMessage.prototype, 'save').resolves(savedPost);
  
    const response = await request(app).post('/posts').send(newPost);
    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      title: 'Test Post',
      message: 'This is a test',
    });
    expect(response.body).to.have.property('_id');
    expect(response.body).to.have.property('createdAt');
    expect(response.body).to.have.property('likeCount').that.equals(0);
    expect(response.body).to.have.property('tags').that.is.an('array').that.is.empty;
  });
});
