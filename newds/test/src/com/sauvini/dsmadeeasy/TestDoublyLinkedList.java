package com.sauvini.dsmadeeasy;

import java.util.Scanner;

class DLLNode
{
	private int data;
	private DLLNode next;
	private DLLNode prev;
	
	public DLLNode() {
		this.data = 0;
		this.next = null;
		this.prev = null;
	}
	
	public DLLNode(int data, DLLNode next, DLLNode prev) {
		this.data = data;
		this.next = next;
		this.prev = prev;
	}
	
	public int getData() {
		return data;
	}
	public void setData(int data) {
		this.data = data;
	}
	public DLLNode getNext() {
		return next;
	}
	public void setNext(DLLNode next) {
		this.next = next;
	}
	public DLLNode getPrev() {
		return prev;
	}
	public void setPrev(DLLNode prev) {
		this.prev = prev;
	}
	
}
class DoublyLinkedList 
{
	private DLLNode start;
	private DLLNode end;
	private int length;
	
	public void insertAtBeg(int val) {
		DLLNode newNode = new DLLNode(val,null,null);
		if(start==null) {
			start = newNode;
			end = start;
		}
		else {
			start.setPrev(newNode);
			newNode.setNext(start);
			start = newNode;
		}
		length++;
	}
	
	public void insertAtEnd(int val) {
		DLLNode newNode = new DLLNode(val,null,null);
		if(start==null) {
			start = newNode;
			end = start;
		}
		else {
			newNode.setPrev(end);
			end.setNext(newNode);
			end = newNode;
		}
		length++;
	}
	
	public void insertAtPos(int val, int position) {
		DLLNode newNode = new DLLNode(val,null,null);
		if(position == 1){
			insertAtBeg(val);
			return;
		}
		if(position > length){
			insertAtEnd(val);
			return;
		}
		DLLNode ptr = start;
		for (int i = 2; i <= length; i++) {
			if(position == i ){
				DLLNode tmp = ptr.getNext();
				ptr.setNext(newNode);
				newNode.setPrev(ptr);
				newNode.setNext(tmp);
				tmp.setPrev(newNode);
			}
			ptr = ptr.getNext();
		}
		length++;
	}
	
	public void deleteAtPos(int position) {
		if(position==1) {
			start = start.getNext();
			start.setPrev(null);
			length--;
		}
		if(position == length) {
			end = end.getPrev();
			end.setNext(null);
			length--;
			return;
		}
		DLLNode ptr = start.getNext();
		for (int i = 2; i < length; i++) {
			if(i == position) {
				DLLNode n = ptr.getNext();
				DLLNode p = ptr.getPrev();
				
				p.setNext(n);
				n.setPrev(p);
				length--;
			}
			ptr = ptr.getNext();
		}
	}

	public void display() 
	{
		if(length==0) {
			System.out.println("list is empty\n");
			return;
		}
		if(start.getNext()==null) {
			System.out.print(start.getData());
			return;
		}
		DLLNode ptr = start;
		System.out.print(start.getData()+"->");
		ptr = start.getNext();
		while(ptr.getNext()!=null){
			System.out.print(ptr.getData()+"->");
			ptr = ptr.getNext();
		}
		System.out.println(ptr.getData()+ "\n");
	}
	
	public boolean isEmpty() {
		return start==null;
	}
	
	public int firstNode() {
		return start.getData();
	}
	public int lastNode() {
		return end.getData();
	}
	public DLLNode getStart() {
		return start;
	}
	public void setStart(DLLNode start) {
		this.start = start;
	}
	public DLLNode getEnd() {
		return end;
	}
	public void setEnd(DLLNode end) {
		this.end = end;
	}
	public int getLength() {
		return length;
	}
	public void setLength(int length) {
		this.length = length;
	}
	
}
public class TestDoublyLinkedList {
	public static void main(String args[]) 
	{
		char ch;
		DoublyLinkedList doublyList = new DoublyLinkedList();
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
					doublyList.insertAtBeg(scan.nextInt());
					break;

				case 2:
					System.out.println("Enter value to insert");
					doublyList.insertAtEnd(scan.nextInt());
					break;

				case 3:
					System.out.println("Enter value to insert");
					int val = scan.nextInt();
					System.out.println("Enter position");
					int pos = scan.nextInt();
					if(pos < 1 || pos > doublyList.getLength() + 1) 
					{
						System.out.println("Invalid position\n");
					}
					else
						doublyList.insertAtPos(val, pos);
					break;

				case 4:
					System.out.println("Enter position to delete");
					int position = scan.nextInt();
					if(position < 1 || position > doublyList.getLength()) 
					{
						System.out.println("Invalid position\n");
					}
					else
						doublyList.deleteAtPos(position);
					break;

				case 5:
					System.out.println("list length: " + doublyList.getLength());
					break;

				case 6:
					System.out.println("is empty: " + doublyList.isEmpty());
					break;
					
				case 7:
					System.out.println("first Node: " + doublyList.firstNode());
					break;
					
				case 8:
					System.out.println("last Node: " + doublyList.lastNode());
					break;

				default:
					System.out.println("please enter correct option");
					break;
				}
				System.out.print("list is: ");
				doublyList.display();
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
