package com.sauvini.datastructure;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

public class TestLinkedHashSet {
	public static void main(String[] args) {
		Set<String> ital = new LinkedHashSet<String>();
		Collections.addAll(ital, "IT", "VA", "SM", "CH");
		System.out.println(ital);
		ital.remove("VA");
		System.out.println(ital);
		ital.add("VA");
		System.out.println(ital);
	}
}