export const vocabulary = {
  article: {
    ARTICLE_NOT_FOUND: 'Article not found.',
    NOT_AUTHOR_OF_ARTICLE: 'You are not author of this article',
    SUCCESSFUL_DELETE_OF_ARTICLE: 'Article deleted successfully.',
  },
  auth: {
    WRONG_PASSWORD: 'Wrong password.',
    USER_IS_NOT_ACTIVE: 'User is not active. Check your email for activation!',
    USER_IS_ACTIVATED: 'Your account is now active!',
    USER_ALREADY_ACTIVATED: 'User already activated',
    LINK_EXPIRED:
      'The confirmation link has expired. Please request a new one.',
    INVALID_TOKEN: 'Invalid confirmation token.',
  },
  comments: {
    COMMENT_NOT_FOUND: 'Comment not found.',
    NOT_AUTHOR_OF_COMMENT: 'You are not author of this comment.',
    SUCCESSFUL_DELETE_OF_COMMENT: 'Comment deleted successfully.',
  },
  reactions: {
    REACTION_NOT_FOUND: 'Reaction not found.',
    NOT_AUTHOR_OF_REACTION: 'You are not author of this reaction.',
    SUCCESSFUL_DELETE_OF_REACTION: 'Comment deleted successfully.',
    WRONG_REACTION_TYPE_FOR_COMMENT: 'Wrong reaction types for comment.',
    WRONG_REACTION_TYPE_FOR_ARTICLE: 'Wrong reaction types for article.',
    ALREADY_REACTED_TO_ARTICLE: 'You have already reacted to this article.',
    ALREADY_REACTED_TO_COMMENT: 'You have already reacted to this comment.',
    COMMENT_OR_ARTICLE_ID_REQUIRED:
      'Either commentId or articleId must be provided.',
  },
  users: {
    USER_NOT_FOUND: 'User not found.',
    ALREADY_EXISTS: 'User already exists.',
    EMAIL_IS_TAKEN: 'This email is taken.',
  },
};
