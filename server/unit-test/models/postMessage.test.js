import PostMessage from '../../models/postMessage.js';
import mongoose from 'mongoose';
import { expect } from 'chai';

describe('PostMessage Model', () => {
  it('should have default values for likeCount and createdAt', () => {
    const post = new PostMessage({
      title: 'Test Title',
      message: 'Test Message',
      creator: 'Test Creator',
      tags: ['tag1', 'tag2'],
    });

    expect(post.likeCount).to.equal(0);
    expect(post.createdAt).to.be.instanceOf(Date);
  });

  it('should throw a validation error for invalid types', async () => {
    const post = new PostMessage({
      title: 'Test Title',
      message: 'Test Message',
      creator: 'Test Creator',
      likeCount: 'stringInsteadOfNumber', // Invalid type
    });

    try {
      await post.validate();
    } catch (error) {
      expect(error.errors.likeCount).to.exist;
    }
  });
});
