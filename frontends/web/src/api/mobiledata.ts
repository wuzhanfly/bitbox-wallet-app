/**
 * Copyright 2022 Shift Crypto AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { apiGet } from '../utils/request';
import { subscribeEndpoint, SubscriptionCallback } from './subscribe';

export const getUsingMobileData = (): Promise<boolean> => {
  return apiGet('using-mobile-data');
};

export const subscribeUsingMobileData = (
  cb: SubscriptionCallback<boolean>
) => (
  subscribeEndpoint('using-mobile-data', cb)
);
