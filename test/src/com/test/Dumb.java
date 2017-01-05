package com.test;

public class Dumb {

	public static void main(String[] args) {
		String s1 = "ABC";
		String s2 = new String("ABC");
		String s3 = "ABC";
		
		System.out.println(s1==s2);               //false
		System.out.println(s1==s3);					//true
		System.out.println(s1.equals(s2));			//true
		System.out.println(s1.equals(s3));			//true
		
		Integer i1 = 3;
		Integer i2 = 3;
		
		System.out.println(i1==i2);               //true
		System.out.println(i1.equals(i2));	      //true
		
		
		Integer i11 = 9;
		Integer i21 = new Integer(9);
		
		System.out.println(i11==i21);               //false
		System.out.println(i11.equals(i21));        //true
		
		String i111 = "9";
		String i211 = new String("9");
		
		System.out.println(i111==i211);               //false
		System.out.println(i111.equals(i211));        //true
		
		String i1111 = "128";
		String i2111 = new String("128");
		
		System.out.println(i1111==i2111);               //false
		System.out.println(i1111.equals(i2111));        //true

	}

}
