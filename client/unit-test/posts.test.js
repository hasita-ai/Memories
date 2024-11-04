import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../src/actions/posts';
import * as api from '../src/api/index';
import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../src/constants/actionTypes';

// Mock the API methods
jest.mock('../src/api');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Post Actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('getPosts action', () => {
    it('should dispatch FETCH_ALL action and return data on success', async () => {
      const mockData = [{ id: '1', title: 'Post 1' }];
      api.fetchPosts.mockResolvedValue({ data: mockData });

      await store.dispatch(actions.getPosts());
      const actionsCalled = store.getActions();

      expect(actionsCalled[0].type).toBe(FETCH_ALL);
      expect(actionsCalled[0].payload).toEqual(mockData);
    });
  });

  describe('createPost action', () => {
    it('should dispatch CREATE action and return new post on success', async () => {
      const newPost = { title: 'New Post' };
      api.createPost.mockResolvedValue({ data: newPost });

      await store.dispatch(actions.createPost(newPost));
      const actionsCalled = store.getActions();

      expect(actionsCalled[0].type).toBe(CREATE);
      expect(actionsCalled[0].payload).toEqual(newPost);
    });
  });

  describe('updatePost action', () => {
    it('should dispatch UPDATE action and return updated post on success', async () => {
      const updatedPost = { id: '1', title: 'Updated Post' };
      api.updatePost.mockResolvedValue({ data: updatedPost });

      await store.dispatch(actions.updatedPost('1', updatedPost));
      const actionsCalled = store.getActions();

      expect(actionsCalled[0].type).toBe(UPDATE);
      expect(actionsCalled[0].payload).toEqual(updatedPost);
    });
  });

  describe('deletePost action', () => {
    it('should dispatch DELETE action with the correct id on success', async () => {
      const postId = '1';
      api.deletePost.mockResolvedValue();

      await store.dispatch(actions.deletePost(postId));
      const actionsCalled = store.getActions();

      expect(actionsCalled[0].type).toBe(DELETE);
      expect(actionsCalled[0].payload).toBe(postId);
    });
  });

  describe('likePost action', () => {
    it('should dispatch UPDATE action and return liked post on success', async () => {
      const likedPost = { id: '1', title: 'Liked Post', likeCount: 1 };
      api.likePost.mockResolvedValue({ data: likedPost });

      await store.dispatch(actions.likePost('1'));
      const actionsCalled = store.getActions();

      expect(actionsCalled[0].type).toBe(UPDATE);
      expect(actionsCalled[0].payload).toEqual(likedPost);
    });
  });
});
