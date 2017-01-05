package com.test;

class dimond1
{ 
	public static void main(String ar[])
	{

		for(int i=0;i<5;i++)
		{ 
				for(int j=5;j>i+1;j--)
				{
					System.out.print(" ");
				}
				for(int k=0;k<=i*2 ;k++)
				{
					System.out.print("*");
				}
				for(int l=5;l>i+1;l--)
				{
					System.out.print(" "); 
				}
					System.out.print('\n');
		}
	}

}








