package com.sauvini.test;

import java.util.HashSet;

class test {
	public int i =12;

	public test() {	
	i =13;
	}

	public String toString() {
	return "Animal"+i;
	}
}
	public class Hashset {
		public static void main(String[] args) throws Exception {
		HashSet<test> s = new HashSet<test>();
		s.add(new test());
		s.add(new test());
		for(test a : s) {
		System.out.println(a);
		}
	}
}
