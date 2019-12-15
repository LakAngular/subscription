import { Injectable } from '@angular/core';
import { ISubscription } from '../_models/isubscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
public subscription: ISubscription[] = [];
constructor() { }


/** method to save the subscription
 * @param email string
 * @param subscription  string
 * @param password string
 */

saveSubscription(subscription: ISubscription) {
  this.subscription.push(subscription);
}


/** @description method to return the subscription
 *  @set  email string, subscription string, password string
 */

getSubscription() {
  return this.subscription;
}
}
