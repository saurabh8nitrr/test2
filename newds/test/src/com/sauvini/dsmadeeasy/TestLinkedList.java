package com.sauvini.dsmadeeasy;

import java.util.Scanner;

class Node {
	private int data;
	private Node next;

	public Node()
	{
		this.next = null;
		this.data = 0;
	}
	public Node(int data,Node next)
	{
		this.data = data;
		this.next = next;
	} 
	public int getData() 
	{
		return data;
	}
	public void setData(int data) 
	{
		this.data = data;
	}
	public Node getNext() 
	{
		return next;
	}
	public void setNext(Node next) 
	{
		this.next = next;
	}

}

class LinkedList 
{
	private Node start;
	private Node end;
	private int length;

	/**insert at beginning
	 * @param val value to insert in list
	 */
	public void insertAtBeg(int val) 
	{
		Node newNode = new Node(val, null);
		length++;
		if(start==null){
			start = newNode;
			end = start;
		}
		else {
			newNode.setNext(start);
			start = newNode;
		}
	}

	/**Insert a value at the end of the list
	 * @param val, value to insert
	 */
	public void insertAtEnd(int val) 
	{
		Node newNode = new Node(val, null);
		length++;
		if(start==null){
			start = newNode;
			end = start;
		}
		else {
			end.setNext(newNode);
			end = newNode;
		}
	}

	/**Insert a value at a certain position
	 * @param val, value to insert
	 * @param position, position to insert at
	 */
	public void insertAtPos(int val, int position) 
	{
		Node newNode = new Node(val, null);
		position = position -1;
		Node ptr = start;
		for (int i = 1; i < length; i++) {
			if(i==position) {
				Node tmp = ptr.getNext();
				ptr.setNext(newNode);
				newNode.setNext(tmp);
				break;
			}
			ptr = ptr.getNext();
		}
		length++;
	}
	
	/** delete a node from the list
	 * @param position, position to delete
	 */
	public void deleteAtPos(int position) 
	{
		if(position == 1) {
			start = start.getNext();
			length--;
			return;
		}
		if(position == length) {
			Node s = start;
			Node t = start;

			while(s!=end) {
				t=s;
				s=s.getNext();
			}
			t.setNext(null);
			end = t;
			length--;
			return;
		}
		Node ptr = start;
		position = position-1;
		for (int i = 1; i < length-1; i++) {
			if(i==position) {
				Node tmp = ptr.getNext();
				tmp = tmp.getNext();
				ptr.setNext(tmp);
				break;
			}
			ptr=ptr.getNext();
		}
		length--;
	}

	public boolean isEmpty() 
	{
		return start==null;
	}

	public int firstNode() 
	{
		return start.getData();
	}
	
	public int lastNode() 
	{
		return end.getData();
	}
	/** display list data
	 *  
	 */
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
		Node ptr = start;
		System.out.print(start.getData()+"->");
		ptr = start.getNext();
		while(ptr.getNext()!=null){
			System.out.print(ptr.getData()+"->");
			ptr = ptr.getNext();
		}
		System.out.println(ptr.getData()+ "\n");
	}

	//getters and setters for instance variables

	public Node getStart() 
	{
		return start;
	}

	public void setStart(Node start) 
	{
		this.start = start;
	}

	public Node getEnd() 
	{
		return end;
	}

	public void setEnd(Node end) 
	{
		this.end = end;
	}

	public int getLength() 
	{
		return length;
	}

	public void setLength(int length) 
	{
		this.length = length;
	}


}

public class TestLinkedList 
{
	public static void main(String args[]) 
	{
		char ch;
		LinkedList list = new LinkedList();
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
					list.insertAtBeg(scan.nextInt());
					break;

				case 2:
					System.out.println("Enter value to insert");
					list.insertAtEnd(scan.nextInt());
					break;

				case 3:
					System.out.println("Enter value to insert");
					int val = scan.nextInt();
					System.out.println("Enter position");
					int pos = scan.nextInt();
					if(pos <= 1 || pos > list.getLength()) 
					{
						System.out.println("Invalid position\n");
					}
					else
						list.insertAtPos(val, pos);
					break;

				case 4:
					System.out.println("Enter position to delete");
					int position = scan.nextInt();
					if(position < 1 || position > list.getLength()) 
					{
						System.out.println("Invalid position\n");
					}
					else
						list.deleteAtPos(position);
					break;

				case 5:
					System.out.println("list length: " + list.getLength());
					break;

				case 6:
					System.out.println("is empty: " + list.isEmpty());
					break;
				case 7:
					System.out.println("first Node: " + list.firstNode());
					break;
				case 8:
					System.out.println("last Node: " + list.lastNode());
					break;

				default:
					System.out.println("please enter correct option");
					break;
				}
				System.out.print("list is: ");
				list.display();
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
