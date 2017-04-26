package com.sauvini.test;

import java.util.Scanner;

class TowerOfHanoi {
	
	public void toh(int n, String start, String aux, String end) {
		if(n==1){
			System.out.println(start + "->" + end);
		} else {
			toh(n-1, start, end, aux);
			System.out.println(start + "->" + end);
			toh(n-1, aux,start, end);
		}
	}
	
	public static void main(String args[]) {
		TowerOfHanoi t = new TowerOfHanoi();
		System.out.println("Enter no of discs");
		Scanner scanner  = new Scanner (System.in);
		int discs = scanner .nextInt();
		t.toh(discs, "A", "B", "C");
	}

}
