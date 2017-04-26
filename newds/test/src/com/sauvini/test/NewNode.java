package com.sauvini.test;

import javax.xml.stream.events.StartDocument;

public class NewNode {
	public int data;
	public NewNode next;
	public NewNode(int data, NewNode next) {
		this.data = data;
		this.next = next;
	}
	public NewNode() {
		this.next = null;
	}
/*	public static NewNode nthlast(NewNode node, int n) {
		NewNode current = node;
		NewNode follower = node;
		for(int i=0; i < n; i++) {
			if(current == null) return null;
			current = current.next;
		}
		while (current.next != null) {
			current = current.next;
			follower = follower.next;
		}
		
		return follower;
		
	}
	
	public static boolean findLoop(NewNode head){
		NewNode slow = head;
		NewNode fast = head;
		while(fast.next!=null && fast!=null){
			slow = slow.next;
			fast = fast.next.next;
			if(slow == fast){
				return true;
			}
		}
		return false;
		
	}*/
	
	public String toString() {
		return data + "";
	}
	public int getData() {
		return data;
	}
	public void setData(int data) {
		this.data = data;
	}
	public NewNode getNext() {
		return next;
	}
	public void setNext(NewNode next) {
		this.next = next;
	}
	
}

class linkedListFull
{
    NewNode start=new NewNode();
    NewNode end=new NewNode() ;
    public int size ;
    
    public void delete(int position){
		if(position == 1){
			//NewNode head = null;
			//getNext() = head;
			start = start.getNext();
			//head = node.getNext();
		}
/*a=a.next;
return a;*/
    }
}
