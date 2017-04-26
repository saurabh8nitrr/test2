package com.sauvini.test;

public class NewStringNode {
	public String data;
	public NewStringNode next;
	public NewStringNode(String data, NewStringNode next) {
		this.data = data;
		this.next = next;
	}
	
	/*public NewStringNode nthlast(NewStringNode node, int n) {
		NewStringNode current = node;
		NewStringNode follower = node;
		for(int i=0; i < n; i++) {
			if(current == null) return null;
			current = current.next;
		}
		while (current.next != null) {
			current = current.next;
			follower = follower.next;
		}
		
		return follower;
		
	}*/
	public String toString() {
		return data;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public NewStringNode getNext() {
		return next;
	}
	public void setNext(NewStringNode next) {
		this.next = next;
	}
	
}
