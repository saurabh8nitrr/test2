package com.sauvini.datastructure;

public class TestConcordance {
	public static final String PATH = "C:\\Users\\Saurabh\\Desktop\\";
	public static final String IN_FILE = "isArraySorted.java";
	public static final String OUT_FILE = "isArraySorted.out";

	public static void main(String[] args) {
		Concordance c = new Concordance(PATH+IN_FILE);
		c.write(PATH+OUT_FILE);
	}
}