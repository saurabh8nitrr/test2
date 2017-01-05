package com.test;

import java.awt.*;
import java.applet.*;
/*
<applet code=fr1 width=200 height=200>
</applet>
*/
public class fr1 extends Applet
{
        Frame f;
        public void init()
        {
                //f=new Frame();
                f=new Frame("Notepad");
                //f.setTitle("..");
                f.setSize(200, 200);
                f.setVisible(true);
        }
}
