import { Injectable } from '@angular/core';


declare var io: any;
@Injectable()
export class CollaborationService {
	collaboration_socket: any;

  constructor() { }

  init(): void{
  	this.collaboration_socket = io(window.location.origin,
  		                           {query: 'message=' + 'haha'});
  	this.collaboration_socket.on('message', (message)=>{
  		console.log('message from server:'+message);
  	})
  }

}
