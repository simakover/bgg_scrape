'use strict';
import vkontakte from 'vkontakte';

const ACCESS_TOKEN =
  'vk1.a.w_tQJ4GVTF-C5bdwTmZpAdtvvgL_xkp_tuEld38uPRl6X6Wzkz6iQq51HC9Sj0amockw9fHtT05XukgWzdeWxTeKNGVd0W1x5GclgLsX_4vFzEWVY9YbfpzRv0GY5nlletwZDGpVLk_XXBc1p2CAI859J5ZeBMmtmT1lOFL9KDO6i6aHMpU91ms2b_vaPXr3xmkcCbYo0R30Usqt3Bnj0Q';

var vk = vkontakte(ACCESS_TOKEN);
vk('friends.get', { fields: 'uid,first_name,photo' }, function (err, friends) {
  console.log(friends);
});
