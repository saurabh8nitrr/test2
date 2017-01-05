package com.collections;

import java.util.ArrayList;
import java.util.List;

public class ArrayListt {
	public static void main(String[] args)
	{
	ArrayList<Integer> aList = new ArrayList<Integer>();
	
	//add
	aList.add(5);
	aList.add(10);
	aList.add(20);
	//index, value
	aList.add(3, 50);
	
	//access
	System.out.println("access");
	for(Integer value : aList)
	System.out.println(value);
	
	//access M-2
		System.out.println("access M-2");
		for(int i=0; i<aList.size(); i++) {
			System.out.println(aList.get(i));
		}
	//remove last element	
	aList.remove(aList.size()-1);
	
	//remove first element (very slow)
	aList.remove(0);	
	
	System.out.println("print after removing");
	for(Integer value : aList){
		System.out.println(value);
	}
	
	//List interface
	System.out.println("using List interface");
	List<String> list = new ArrayList<String>();
	list.add("10");
	System.out.println(list.get(0));
	
	
	}
}
