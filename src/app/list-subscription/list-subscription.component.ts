import { Component, OnInit } from '@angular/core';
import { ISubscription } from '../_models/isubscription';
import { SubscriptionService } from '../_services/subscription.service';

@Component({
  selector: 'app-list-subscription',
  templateUrl: './list-subscription.component.html',
  styleUrls: ['./list-subscription.component.css']
})
export class ListSubscriptionComponent implements OnInit {

  subscription: ISubscription[];
  constructor(
    private subscripitonService: SubscriptionService
  ) { }

  ngOnInit() {
    this.listSubscription();
  }

  /** @description Method for listing the subscriptions
   *  @set email string, subscription string, password string
   */
  listSubscription() {
    this.subscription = this.subscripitonService.getSubscription();
  }

}
