package com.sauvini.dsmadeeasy;

import java.util.Scanner;

class CLLNode {
	private int data;
	private CLLNode next;
	
	public CLLNode() {
		this.data = 0;
		this.next = null;
	}
	
	public CLLNode(int data, CLLNode next) {
		this.data = data;
		this.next = next;
	}
	public int getData() {
		return data;
	}
	public void setData(int data) {
		this.data = data;
	}
	public CLLNode getNext() {
		return next;
	}
	public void setNext(CLLNode next) {
		this.next = next;
	}
}

class CircularLinkedList {
	CLLNode start;
	CLLNode end;
	int length;
	
	public void insertAtBeg(int val) {
		CLLNode newNode = new CLLNode(val,null);
		newNode.setNext(start);
		if(start == null) {
			start = newNode;
			newNode.setNext(start);
			end = start;
		}
		else {
			end.setNext(newNode);
			start = newNode;
		}
		length++;
	}
	
	public void insertAtEnd(int val) {
		CLLNode newNode = new CLLNode(val,null);
		newNode.setNext(start);
		if(start == null) {
			start = newNode;
			end = start;
		}
		else {
			end.setNext(newNode);
			end = newNode;
		}
		length++;
	}
	public void insertAtPos(int val, int position) {
		CLLNode newNode = new CLLNode(val,null);
		CLLNode ptr = start;
		if(position == 1) {
			insertAtBeg(val);
			return;
		}
		if(position > length) {
			insertAtEnd(val);
			return;
		}
		for (int i = 2; i <= length; i++) {
			if(position == i) {
				CLLNode tmp = ptr.getNext();
				ptr.setNext(newNode);
				newNode.setNext(tmp);
				break;
			}
			ptr = ptr.getNext();
		}
		length++;
	}
	
	public void deleteAtPos(int position) {
		if(position == 1) {
			start = start.getNext();
			end.setNext(start);
			length--;
			return;
		}
		if(position == 1 && length == 1) {
			start = null;
			end = start;
			length = 0;
			return;
		}
		if(position == length) {
			CLLNode s = start;
			CLLNode t = start;
			while(s != end) {
				t = s;
				s = s.getNext();
			}
			end = t;
			end.setNext(start);
			length--;
			return;
		}
		CLLNode ptr = start;
		for (int i = 2; i < length; i++) {
			if(i == position) {
				CLLNode tmp = ptr.getNext();
				tmp = tmp.getNext();
				ptr.setNext(tmp);
				break;
			}
			ptr = ptr.getNext();
		}
		
	}
	
	public boolean isEmpty() {
		return start == null;
	}
	
	public int firstNode() {
		return start.getData();
	}
	
	public int lastNode() {
		return end.getData();
	}
	
	 public void display()
	 {
        CLLNode ptr = start;
        if (length == 0) 
        {
            System.out.print("empty\n");
            return;
        }
        if (start.getNext() == start) 
        {
            System.out.print(start.getData()+ "->"+ptr.getData()+ "\n");
            return;
        }
        System.out.print(start.getData()+ "->");
        ptr = start.getNext();
        while (ptr.getNext() != start) 
        {
            System.out.print(ptr.getData()+ "->");
            ptr = ptr.getNext();
        }
        System.out.print(ptr.getData()+ "->");
        ptr = ptr.getNext();
        System.out.print(ptr.getData()+ "\n");
	 }
	
	public CLLNode getStart() {
		return start;
	}
	public void setStart(CLLNode start) {
		this.start = start;
	}
	public CLLNode getEnd() {
		return end;
	}
	public void setEnd(CLLNode end) {
		this.end = end;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	
}
public class TestCircularLinkedList {
	public static void main(String args[]) 
	{
		char ch;
		CircularLinkedList CLLlist = new CircularLinkedList();
		Scanner scan = new Scanner(System.in);
		try 
		{
			do
			{
				System.out.println("Enter the action to be performed:");
				System.out.println("1. Insert to the beginning of the list");
				System.out.println("2. Insert to the end of the list");
				System.out.println("3. Insert at position");
				System.out.println("4. delete at position");
				System.out.println("5. list length");
				System.out.println("6. check empty");
				System.out.println("7. first Node");
				System.out.println("8. last Node");
				int selection = scan.nextInt();
				switch (selection)
				{

				case 1:
					System.out.println("Enter value to insert");
					CLLlist.insertAtBeg(scan.nextInt());
					break;

				case 2:
					System.out.println("Enter value to insert");
					CLLlist.insertAtEnd(scan.nextInt());
					break;

				case 3:
					System.out.println("Enter value to insert");
					int val = scan.nextInt();
					System.out.println("Enter position");
					int pos = scan.nextInt();
					if(pos < 1 || pos > CLLlist.getLength()) 
					{
						System.out.println("Invalid position\n");
					}
					else
						CLLlist.insertAtPos(val, pos);
					break;

				case 4:
					System.out.println("Enter position to delete");
					int position = scan.nextInt();
					if(position < 1 || position > CLLlist.getLength()) 
					{
						System.out.println("Invalid position\n");
					}
					else
						CLLlist.deleteAtPos(position);
					break;

				case 5:
					System.out.println("list length: " + CLLlist.getLength());
					break;

				case 6:
					System.out.println("is empty: " + CLLlist.isEmpty());
					break;
				case 7:
					System.out.println("first Node: " + CLLlist.firstNode());
					break;
				case 8:
					System.out.println("last Node: " + CLLlist.lastNode());
					break;

				default:
					System.out.println("please enter correct option");
					break;
				}
				System.out.print("list is: ");
				CLLlist.display();
				System.out.println("\nDo you want to continue: Y/N");
				ch = scan.next().charAt(0);
			}
			while(ch == 'Y' || ch == 'y'|| ch == '+');
		}
		finally 
		{
			scan.close();
		}
	}
}
