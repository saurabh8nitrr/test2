package com.sauvini.test;

import java.awt.*;
import java.awt.event.*;
public class form extends Frame implements ActionListener
{
        TextField nm, rl, brh;
	    Button rg, cr;
        form()
        {   setTitle("REGISTRATION FORM..");
            setLayout(new GridLayout(7,4));
            add(new Label("Name : "));
			nm=new TextField("", 10);
            add(nm);
			add(new Label());
			add(new Label());
			
			add(new Label("Roll No : "));
			rl=new TextField("", 10);
            add(rl);
			add(new Label());
			add(new Label());
			
			add(new Label("Branch : ")); 
			brh=new TextField("", 10);
            add(brh);
			add(new Label());
			add(new Label());
			
			add(new Label("DOB : "));
			Choice d=new Choice();
			for(int i=1;i<32;i++)
                {
                    d.add("" +i);
                }				
            Choice m=new Choice();
			for(int i=1;i<13;i++)
                {
                    m.add("" +i);
                }				
            Choice y=new Choice();
			for(int i=1950;i<2051;i++)
                {
                    y.add("" +i);
                }								
			add(d);
			add(m);
			add(y);
			
			add(new Label("Sex : "));
			CheckboxGroup s =new CheckboxGroup();
			Checkbox m1 =new Checkbox("Male",true,s);
			Checkbox f =new Checkbox("Female",false,s);
			add(m1);
			add(f);
			add(new Label());
			
		   
		    add(new Label("Address : ")); 
			add(new TextArea("",5,10,0));
			add(new Label());
           	add(new Label());
			
			rg=new Button("Register");
            add(rg);
			add(new Label());
			add(new Label());

			cr=new Button("Clear");
			add(cr);
			
			rg.addActionListener(this);
			cr.addActionListener(this);
			
			
		    setSize(300,300);
            setVisible(true);
        }
		 public void actionPerformed(ActionEvent ae)
        {
                if(ae.getActionCommand().equals("Register"))
                {
                        String n = nm.getText();
                        
                        System.out.println("Name : " + n);
						
						String r = rl.getText();
                        
                        System.out.println("Roll no : " + r);
						
						String b = brh.getText();
                        
                        System.out.println("Branch : " + b);
                }
                if(ae.getSource()==cr)
                {
                        nm.setText("");
						rl.setText("");
						brh.setText("");
                       
                }
        }
	public static void main(String ar[])
    {
        new form();	
	}
}
