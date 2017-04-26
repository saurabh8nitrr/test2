package com.sauvini.datastructure;

public class LinkedList {

	public static void main(String[] args) {
		// one way to initialize linked list
		
		Node start = new Node(11);
		start.next = new Node(22);
		System.out.println(start.data + " -> " + start.next.data);
		
		// another way to initialize the linked list
		
		Node start2 = new Node(11);
		Node p = start2;
		for (int i = 0; i < 4; i++) {
			p.next = new Node(22*i);
			p = p.next;
		}
		
		for (p = start2; p != null; p = p.next) {
			System.out.print(p.data + "->");
		}
	}

	/**
	 * @param start, Node at which deletion is to be performed
	 * @param x, data to be deleted
	 * @return Node after deletion
	 */
	public Node delete(Node start, int x) {
		if(start == null || start.data > x) {   			// x is not in the list
			return start;
		}
		else if(start.data == x) {    						// x is the first element in the list
			return start.next;
		}
		for(Node p = start; p.next != null; p= p.next) {
			if(p.next.data > x) {
				break;										// x is not in the list
			}
			else if (p.next.data == x) { 					// x is in the p.next node
				p.next = p.next.next;						// delete it
				break;
			}
		}
		return start;
	}
	 
	//nested class can also solve the purpose
	
	private static class Node {
		int data;
		Node next;
		
		public Node(int data) {
			this.data = data;
		}
		
		@SuppressWarnings("unused")
		public Node(int data, Node next) {
			this.data = data;
			this.next = next;
		}
		
		@SuppressWarnings("unused")
		public Node() {
			
		}
	}
}
