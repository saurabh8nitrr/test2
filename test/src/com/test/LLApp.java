package com.test;

import java.util.Scanner;

public class LLApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//NewNode front = new NewNode(25, null);
		//System.out.println(front);
		//NewStringNode strfront = new NewStringNode("ewfew", null);
		//System.out.println(strfront);
		Scanner s = new Scanner (System.in);
		// creating nodes
		NewNode a = new NewNode();
		linkedListFull list = new linkedListFull(); 
		NewNode b = new NewNode();
		//a.next = new NewNode();
		NewNode c = new NewNode();
		//a.next.next = new NewNode();
		
		//storing data in nodes
		//System.out.println("Enter node 1");
		//a.setData(s.nextInt());// = s.nextInt();
		list.start=a;
		a.data = 25;
		//System.out.println("Enter node 2");
		//b.data = s.nextInt();7
		//a.next.data = s.nextInt();
		a.next= b;
		b.data = 35;
		//System.out.println("Enter node 3");
		//c.data = s.nextInt();
		//a.next.next.data = s.nextInt();
		b.next=c;
		c.data = 45;
		list.delete(1);
		a=list.start;
		//linking of nodes
		//a.next = b;
		//b.next = c;
		while(a != null){
			//System.out.print(a.next);
			System.out.print(a.data + "->");
			a = a.next;
		}
		System.out.print("null");
		//System.out.println(a.data + "->"+ b.data + "->"+  c.data);
		//NewNode nthlastvalue = a.nthlast(a, 1);
		//System.out.println(nthlastvalue);
		//boolean tr = a.findLoop(a);
		//System.out.println(tr);
	}
	
}
