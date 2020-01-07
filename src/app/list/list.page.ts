import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;

  constructor(public emailComposer: EmailComposer) {}

  ngOnInit() {
  }


  submitFeedback() {
    /*const email = {
      to: 'ashara.jalpa@gmail.com',
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

// Send a text message using default options
    this.emailComposer.open(email);*/
  }
}
