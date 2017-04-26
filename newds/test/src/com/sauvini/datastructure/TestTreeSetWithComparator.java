package com.sauvini.datastructure;

import java.util.Collections;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;

public class TestTreeSetWithComparator {
	public static void main(String[] args) {
		SortedSet<String> ital = new TreeSet<String>(new RevStringComparator());
		Collections.addAll(ital, "IT", "VA", "SM", "CH");
		System.out.println(ital);
	}
}

class RevStringComparator implements Comparator<String> {
	public int compare(String s1, String s2) {
		StringBuilder sb1 = new StringBuilder(s1);
		StringBuilder sb2 = new StringBuilder(s2);
		String s1rev = sb1.reverse().toString();
		String s2rev = sb2.reverse().toString();
		return s1rev.compareTo(s2rev);
	}
}