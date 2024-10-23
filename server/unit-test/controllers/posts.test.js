import * as chai from 'chai';
import { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getPosts, createPost } from '../../controllers/posts.js';
import PostMessage from '../../models/postMessage.js';

chai.use(sinonChai);
describe('Posts Controller', () => {
  let req, res, mockPost;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore(); // Clean up after each test
  });

// Test for getPosts
describe('getPosts', () => {
    it('should fetch all posts and return a 200 status', async () => {
      const mockPosts = [
        { title: 'Test Post 1', message: 'Test Message 1' },
        { title: 'Test Post 2', message: 'Test Message 2' },
      ];
      sinon.stub(PostMessage, 'find').resolves(mockPosts);
      await getPosts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockPosts);
    });

    it('should return a 404 status if there is an error', async () => {
      sinon.stub(PostMessage, 'find').rejects(new Error('Error fetching posts'));
      
      await getPosts(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Error fetching posts' });
    });
  });
});