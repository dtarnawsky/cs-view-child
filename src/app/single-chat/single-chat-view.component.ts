import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { ScrollDetail } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
import { StorageService } from '../services/storage/storage.service';

interface ChatItem {
  sender: string;
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-single-chat-view',
  templateUrl: './single-chat-view.component.html',
  styleUrls: ['./single-chat-view.component.css']  
})
export class SingleChatViewComponent implements OnInit, AfterViewChecked {

  @ViewChild('content') private content!: IonContent;
  
  NFT: any;
  user: any = { image: '', profileID: '', profileInfo: {image: ''}};
  profileInfo: any = {image: ''};
  reciverProfileID: any;
  senderProfileID: any;
  chatArray: Array<ChatItem> = []
  conversationID: any;
  publicKey: any;
  constructor(
    private modal: ModalController,
    private api: ApiServiceService,
    private storage: StorageService
  ) { }

  async ngOnInit() {
    console.log(this.user, this.content);
    this.profileInfo = this.user.profileInfo
    this.conversationID = this.user.conversationID
    this.publicKey = await this.storage.getObject('publicKey')
    console.log(this.publicKey)
    this.reciverProfileID = this.user.profileID || this.user.profileInfo.profileID
    this.senderProfileID = await this.storage.getObject('profileID');
    await this.getChat();
    console.log('content.init',this.content);
  }

  ngAfterViewChecked() {
    this.content.scrollToBottom(0);
  }


  goBack() { this.modal.dismiss() }

  async onFirstTime() {
    try {
      let obj = {
        type: "createConversation",
        consumer: this.reciverProfileID,
        conversationType: 'personal',
        publicKey: this.publicKey
      }      
      const resp: any = {result: {status: {conversationID: 123}}};
      
      return resp
    } catch (error) {
      console.log('error', error);
    }
  }

  async getChat() {

    try {
      if (!this.conversationID) {
        const onFirstTime: any = await this.onFirstTime();
        console.log('onFirstTime',onFirstTime);
        this.conversationID = onFirstTime.result.status.conversationID
      }

      let obj = {
        type: "getAllChats",
        conversationID: this.conversationID,
        skip: 0
      }
      //const resp: any = await this.api.apiProcess(obj).toPromise();
      // console.log(resp);
      this.chatArray = [];
      for (let i = 0; i < 100; i++) {
      this.chatArray.push({sender: `${i}`, message: `hi ${i}`, timestamp: '1:00am'});
      }
      console.log('call API myChat with User', this.chatArray);
    } catch (error) {

    }

  }

  async sendTextMessage(event: any) {
    try {
      if (event) {
        let sendObj = {
          "type": "sendMessage",
          "message": {
            "message": event,
            "receiver": this.reciverProfileID,
            "reply": false,
            "type": 'TEXT',
            conversationID: this.conversationID,
          }
        }
        const resp: any = await this.api.apiProcess(sendObj).toPromise();
        console.log(resp?.result?.status);
        
        if (resp) {
          this.chatArray.push(resp?.result?.status?.result)
        }
      }
    } catch (error) {
      console.log('Errr', error);

    }
  }
}
