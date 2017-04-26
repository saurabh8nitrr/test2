package com.sauvini.collections;

import java.util.HashMap;
import java.util.Map;

public class HashMapp {

	public static void main(String[] args) {
	
		HashMap<Integer, String>  map = new HashMap<Integer, String>();
		
		map.put(1, "Saurabh");
		map.put(2, "Khandelwal");
		map.put(4, "Nishant");
		map.put(3, "Khandelwal");
		//map.put(4, "Gupta");        //this is overriding the value of 4th key
		
		System.out.println(Integer.valueOf("1234"));
		
		System.out.println(map.get(1));
		System.out.println(map.entrySet());
		System.out.println("ok here is hashcode = " + map.hashCode());
		//hashmap does not sort entries
		
		for(Map.Entry<Integer, String> entry: map.entrySet()) {
			int key = entry.getKey();
			String value = entry.getValue();
					System.out.println(key+" : "+value);
		}
		
	}
	
}
