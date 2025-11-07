/*src/services/api-client.ts*/
import * as users from './registerUser';

import * as book from './all-books';

import * as allFillters from './all-fillters';

import * as products from './product-id';

import * as setPostComment from './post-comment';

import * as allComments from './all-comments';



export const Api = {
  users,
  book,
  allFillters,
  products,
  setPostComment,
  allComments,
};
