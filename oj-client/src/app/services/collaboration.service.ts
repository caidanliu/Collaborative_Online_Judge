import { Injectable } from '@angular/core';



declare var io: any;

@Injectable()
export class CollaborationService {
	collaborationSocket: any;

  constructor() { }

  init(editor:any, sessionId:string): void{
  	this.collaborationSocket = io(window.location.origin,
  		                           {query: 'sessionId=' + sessionId});

  	//this.collaboration_socket.on('message', (message)=>{
  	//	console.log('message from server:' + message);
  	//})
  	this.collaborationSocket.on('change', (delta: string)=>{
  		console.log('colla serveice:editor changed by' + delta);
  		delta = JSON.parse(delta);
  		editor.lastAppliedChange = delta;
  		editor.getSession().getDocument().applyDeltas([delta]);
  	})

  }


  change(delta: string): void{
  	this.collaborationSocket.emit('change', delta);
  }

}
