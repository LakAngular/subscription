/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubscriptionService } from './subscription.service';
import { ISubscription} from '../_models/isubscription';

describe('Service: Subscription', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubscriptionService]
    });
  });

  it('should ...', inject([SubscriptionService], (service: SubscriptionService) => {
    expect(service).toBeTruthy();
  }));

  it('Save subscription form value  in service', inject([SubscriptionService], (subscriptionService: SubscriptionService) => {
    // subscriptionService.subscription = [];

    let mockData  = { email: 'test@test.com', subscription: "advanced", password: 'Qkrjription3'};
    subscriptionService.saveSubscription(mockData);

    expect(subscriptionService.subscription[0].email).toBe('test@test.com');
    expect(subscriptionService.subscription[0].subscription).toBe('advanced');
    expect(subscriptionService.subscription[0].password).toBe('Qkrjription3');
    }));

  it('Get subscription form value  in service', inject([SubscriptionService], (subscriptionService: SubscriptionService) => {
      // subscriptionService.subscription = [];
      subscriptionService.subscription = [{ email: 'test@test.com', subscription: 'pro', password: 'Qkrje@2df'}];
      const  restult = subscriptionService.getSubscription();
      expect(restult[0].email).toBe('test@test.com');
      expect(restult[0].subscription).toBe('pro');
      expect(restult[0].password).toBe('Qkrje@2df');
    }));

  });
