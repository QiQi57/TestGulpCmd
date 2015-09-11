//code by AZ
//Common


 //load time range&calculate
    function BuildTimeRange_nouse()
    {
        var dpdListHtml="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendAll('TimeRangeList','txtTime','txtTimeHidden');\" checked=\"checked\"  value=\"All\" />Select all<br />";
        var date=new Date();
        //get the current year
        var currentYear=date.getFullYear();
        //get the current month
        var currentMonth=date.getMonth();//the getMonth method returns 0-11 month
        //the initial year is 2012
        var countOfCheckbox=1;
        for(var initialFiscalYear=2012;initialFiscalYear<=currentYear;initialFiscalYear++)
        {
            var fiscalYear=initialFiscalYear.toString().substring(2);
            if(initialFiscalYear<currentYear)
            {
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1\" />FY"+fiscalYear+" Q1<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2\" />FY"+fiscalYear+" Q2<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3\" />FY"+fiscalYear+" Q3<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4\" />FY"+fiscalYear+" Q4<br />";
            countOfCheckbox+=4;   
            }
            if(initialFiscalYear==currentYear&&currentMonth<3)
            {
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1\" />FY"+fiscalYear+" Q1<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2\" />FY"+fiscalYear+" Q2<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3\" />FY"+fiscalYear+" Q3<br />";
            countOfCheckbox+=3;   

            }
            if(initialFiscalYear==currentYear&&currentMonth<6&&currentMonth>2)
            {
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1\" />FY"+fiscalYear+" Q1<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2\" />FY"+fiscalYear+" Q2<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3\" />FY"+fiscalYear+" Q3<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4\" />FY"+fiscalYear+" Q4<br />";
            countOfCheckbox+=4;   

            }
            if(initialFiscalYear==currentYear&&currentMonth>5&&currentMonth<9)
            {
                 dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1\" />FY"+fiscalYear+" Q1<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2\" />FY"+fiscalYear+" Q2<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3\" />FY"+fiscalYear+" Q3<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4\" />FY"+fiscalYear+" Q4<br />";

                fiscalYear=parseInt(fiscalYear)+1;
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1\" />FY"+fiscalYear+" Q1<br />";
            countOfCheckbox+=5;   

            }
            if(initialFiscalYear==currentYear&&currentMonth>8&&currentMonth<12)
            {
                 dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1\" />FY"+fiscalYear+" Q1<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2\" />FY"+fiscalYear+" Q2<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3\" />FY"+fiscalYear+" Q3<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4\" />FY"+fiscalYear+" Q4<br />";

                fiscalYear=parseInt(fiscalYear)+1;
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1\" />FY"+fiscalYear+" Q1<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2\" />FY"+fiscalYear+" Q2<br />";
            countOfCheckbox+=6;   
            }
        }
        $("#TimeRangeList").append(dpdListHtml);
        //Reset the height of drpList
        //the height of checkbox is 16
        $("#TimeRangeList").height(countOfCheckbox*16);
    }

    
    function BuildTimeRange()
    {
        var dpdListHtml="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendAll('TimeRangeList','txtTime','txtTimeHidden');\" checked=\"checked\"  value=\"All\" />Select all<br />";
        var date=new Date();
        //get the current year
        var currentYear=date.getFullYear();
        //get the current month
        var currentMonth=date.getMonth()+1;//the getMonth method returns 0-11 month
        
        var countOfCheckbox=1;

        var lastFiscalYear=2013;
        //the initial year is last year
        //
        // if current month is 1-6 and this year is 2013, then last year is 2011
        // if current month is 7-12 and this year is 2013, then last year is 2012
        //

        if(currentMonth < 7)
        {
            lastFiscalYear = currentYear-1;
        }
        else
        {
            lastFiscalYear = currentYear;
        }

        //Add last fiscal year
        {
            var fiscalYear=lastFiscalYear.toString().substring(2);
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M1\" />FY"+fiscalYear+" Q1-Jul<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M2\" />FY"+fiscalYear+" Q1-Aug<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M3\" />FY"+fiscalYear+" Q1-Sep<br />";
            

            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M4\" />FY"+fiscalYear+" Q2-Oct<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M5\" />FY"+fiscalYear+" Q2-Nov<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M6\" />FY"+fiscalYear+" Q2-Dec<br />";
            

            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M7\" />FY"+fiscalYear+" Q3-Jan<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M8\" />FY"+fiscalYear+" Q3-Feb<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M9\" />FY"+fiscalYear+" Q3-Mar<br />";
            

            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M10\" />FY"+fiscalYear+" Q4-Apr<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M11\" />FY"+fiscalYear+" Q4-May<br />";
            dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M12\" />FY"+fiscalYear+" Q4-Jun<br />";
            
            countOfCheckbox+=12;  
        }

        //add current fiscal year
        {
            lastFiscalYear = lastFiscalYear+1;
            var fiscalYear=lastFiscalYear.toString().substring(2);

            if( (currentMonth <=9) && (currentMonth >=7))
            {
            /*
                for(var i = 1;i<=currentMonth-6;i++)
                {
                    dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M" + i + "\" />FY"+fiscalYear+" Q1M" + i + "<br />";
                }
                */
                switch(currentMonth)
                {
                case 7:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M" + 1 + "\" />FY"+fiscalYear+" Q1-Jul<br />";
                break;
                case 8:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M" + 1 + "\" />FY"+fiscalYear+" Q1-Jul<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M" + 2 + "\" />FY"+fiscalYear+" Q1-Aug<br />";
                break;
                case 9:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M" + 1 + "\" />FY"+fiscalYear+" Q1-Jul<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M" + 2 + "\" />FY"+fiscalYear+" Q1-Aug<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M" + 3 + "\" />FY"+fiscalYear+" Q1-Sep<br />";
                break;
                default:
                break;
                }
                countOfCheckbox+=currentMonth-6; 
            }

            if( (currentMonth <=12) && (currentMonth >=10))
            {
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M1\" />FY"+fiscalYear+" Q1-Jul<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M2\" />FY"+fiscalYear+" Q1-Aug<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M3\" />FY"+fiscalYear+" Q1-Sep<br />";
                /*
                for(var i = 1;i<=currentMonth-9;i++)
                {
                    dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M" + (i +3) + "\" />FY"+fiscalYear+" Q2M" + (i +3) + "<br />";
                }
                */
                
                switch(currentMonth)
                {
                case 10:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M" + 4 + "\" />FY"+fiscalYear+" Q2-Oct<br />";
                break;
                case 11:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M" + 4 + "\" />FY"+fiscalYear+" Q2-Oct<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M" + 5 + "\" />FY"+fiscalYear+" Q2-Nov<br />";
                break;
                case 12:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M" + 4 + "\" />FY"+fiscalYear+" Q2-Oct<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M" + 5 + "\" />FY"+fiscalYear+" Q2-Nov<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M" + 6 + "\" />FY"+fiscalYear+" Q2-Dec<br />";
                break;
                default:
                break;
                }

                countOfCheckbox+=currentMonth-6; 
            }

            if( (currentMonth <=3) && (currentMonth >=1))
            {
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M1\" />FY"+fiscalYear+" Q1-Jul<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M2\" />FY"+fiscalYear+" Q1-Aug<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M3\" />FY"+fiscalYear+" Q1-Sep<br />";

                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M4\" />FY"+fiscalYear+" Q2-Oct<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M5\" />FY"+fiscalYear+" Q2-Nov<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M6\" />FY"+fiscalYear+" Q2-Dec<br />";
                
                /*
                for(var i = 1;i<=currentMonth;i++)
                {
                    dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M" + (i + 6)+ "\" />FY"+fiscalYear+" Q3M" + (i +6)+ "<br />";
                }
                */
                switch(currentMonth)
                {
                case 1:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M" + 7 + "\" />FY"+fiscalYear+" Q3-Jan<br />";
                break;
                case 2:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M" + 7 + "\" />FY"+fiscalYear+" Q3-Jan<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M" + 8 + "\" />FY"+fiscalYear+" Q3-Feb<br />";
                break;
                case 3:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M" + 7 + "\" />FY"+fiscalYear+" Q3-Jan<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M" + 8 + "\" />FY"+fiscalYear+" Q3-Feb<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M" + 9 + "\" />FY"+fiscalYear+" Q3-Mar<br />";
                break;
                default:
                break;
                }
                countOfCheckbox+=currentMonth+6; 
            }

            if( (currentMonth <=6) && (currentMonth >=4))
            {
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M1\" />FY"+fiscalYear+" Q1-Jul<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M2\" />FY"+fiscalYear+" Q1-Aug<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q1M3\" />FY"+fiscalYear+" Q1-Sep<br />";

                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M4\" />FY"+fiscalYear+" Q2-Oct<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M5\" />FY"+fiscalYear+" Q2-Nov<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q2M6\" />FY"+fiscalYear+" Q2-Dec<br />";

                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M7\" />FY"+fiscalYear+" Q3-Jan<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M8\" />FY"+fiscalYear+" Q3-Feb<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q3M9\" />FY"+fiscalYear+" Q3-Mar<br />";
                /*
                for(var i = 1;i<=currentMonth-3;i++)
                {
                    dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M" + (i +9)+ "\" />FY"+fiscalYear+" Q4M" + (i+9) + "<br />";
                }
                */
                switch(currentMonth)
                {
                case 4:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M" + 10 + "\" />FY"+fiscalYear+" Q4-Apr<br />";
                break;
                case 5:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M" + 10 + "\" />FY"+fiscalYear+" Q4-Apr<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M" + 11 + "\" />FY"+fiscalYear+" Q4-May<br />";
                break;
                case 6:
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M" + 10 + "\" />FY"+fiscalYear+" Q4-Apr<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M" + 11 + "\" />FY"+fiscalYear+" Q4-May<br />";
                dpdListHtml+="<input type=\"checkbox\" id=\"TimeRangeCheckBox\" class=\"CheckBoxList\" onchange=\"AppendCheckBoxInfo('TimeRangeList', 'txtTime', 'txtTimeHidden');\" checked=\"checked\" value=\"FY"+fiscalYear+"Q4M" + 12 + "\" />FY"+fiscalYear+" Q4-Jun<br />";
                break;
                default:
                break;
                }
                countOfCheckbox+=currentMonth+6; 
            }
        }


        $("#TimeRangeList").append(dpdListHtml);
        //Reset the height of drpList
        //the height of checkbox is 16
        $("#TimeRangeList").height(countOfCheckbox*16);
    }
    
(function ($) {
    $.fn.goTo = function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'slow');
        return this; // for chaining...
    }
})(jQuery);


//function for get filter info
var filterDictJson;

//function to get support topic level2
function getSTL2() {
    var STL1 = $("#SP_Selection").val();
    var host = getHostUrl();
    $.post(
        host + "/GetSTL2.srv",
        { STL1: STL1 },
        function (data) {
            $("#STL2_Selection").find("option").remove();
            var STL2Array = $.parseJSON(data);
            //show it in page
            $("#STL2_Selection").append("<option value='All'>" + "All" + "</option>");
            for (var i = 0; i < (STL2Array.length); i++) {
                $("#STL2_Selection").append("<option value='" + STL2Array[i] + "'>" + STL2Array[i] + "</option>");
            }
        }
    );
}

var bindFlag = false;
function getSupportTopicLevel2(parameters)
{
    var level1Name = parameters;
    var host = getHostUrl();
    $.post(
        host + "/GetSTL2ByMultipleST1.srv",
        { level1Name: level1Name },
        function (data) {
            var STL2string = $.parseJSON(data);
            //show it in page
            $("#contentTable").html(STL2string);

            var productL2="";
            var listItems = $('input[type="checkbox"][name="radio"]:checked');
            listItems.each(function (idx, ck) {
                productL2 += $(ck).val() + ",";
            });
            $("#proLevel2NameHidden").val(productL2.substring(0, productL2.length - 1))
            $.ajax({
                url:host+"/GetProductIDByPL2.srv",
                type:"POST",
                data:{ProductLevel2Names:productL2.replace(/,/g,"','").substring(0,productL2.replace(/,/g,"','").length-3)},
                async:false,
                success:function(data)
                {
                    if(data=="parameter error")
                    {
                        return;
                    }
                    var dataJson=$.parseJSON(data);
                    var productId="";
                    var selectedItems=0;
                    $.each(dataJson,function(key,value){
                        productId+=value["ProductID"].toString()+",";
                        selectedItems++;
                    });
                    $("#txtProductTreeHidden").val(productId.substring(0,productId.length-1));
                    selectedProducts=productId;
                    if(selectedItems==0)
                    {
                        $("#txtProductTree").attr("value", "Selected " + "0" + " item");
                    }
                    else
                    {
                        if(selectedItems==1)
                        {
                            $("#txtProductTree").attr("value", "Selected " + selectedItems + " item");
                        }
                        else
                        {
                            $("#txtProductTree").attr("value", "Selected " + selectedItems + " items");
                        }
                    }
                }
            });
            $("#ProLevel2Hidden").val(productL2.substring(0, productL2.length - 1))
            //selectedProducts is a global variable defined in the topissue page
            if(bindFlag == false) {
                   getProductInfoFlag();
               }
            else{
                getProductInfo();
            }
        }
    );
}

//function for sorting taxonomy
function sortFunction(a, b) {
    var aCode = 0;
    var bCode = 0;
    for (var i = 0; i < a.toString().length; i++) {
        aCode = aCode + a.charCodeAt(i);
    }
    for (var i = 0; i < b.toString().length; i++) {
        bCode = bCode + b.charCodeAt(i);
    }
    return (aCode - bCode);
}

$(document).ready(function () {
    var guid = getUrlVars()["guid"];
    $("#txtGuid").val(guid);
    DisableViewReportButton();
    $("#loadImageDiv").hide();
    $("#showData").hide();
    $("#floatHeaderDiv").hide();
    $("#report_image").hide();
    $("#reportFrame").hide();
    $("#TICReportTable").hide();
    
    AppendAll('RegionList', 'txtRegion', 'txtRegionHidden');

    //start//define quick date picker
    $("#quickTimeSelector").change(function () {
        var startDate;
        //get and set default data
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        } if (mm < 10) {
            mm = '0' + mm;
        }
        today = mm + '/' + dd + '/' + yyyy;

        var selectValue = $(this).val();

        if (selectValue == "ytd") {

            $("#startDateInput").val("07/01/2012");
        } else if (selectValue == "3") {
            //calculate start date
            var startDate = new Date(today);
            startDate.setMonth(startDate.getMonth() - 2);
            $("#startDateInput").val(startDate.getMonth() + "/" + startDate.getDate() + "/" + startDate.getFullYear());
        } else if (selectValue == "6") {
            var startDate = new Date(today);
            startDate.setMonth(startDate.getMonth() - 5);
            $("#startDateInput").val(startDate.getMonth() + "/" + startDate.getDate() + "/" + startDate.getFullYear());
        }
    });
    //end//

    //start//loading Product Family options
                getSupportTopicLevel2("Cloud,Dynamics,MOD,STB");
    $("#cluster_Selection").change(function () {
        getProductInfo();
    })
    //end//

    //start//loading Taxonomy options
    $("#productList").change(function () {
        getTaxonomyInfo();
    })
    //end//

    //start//loading STL2 options
    $("#SP_Selection").change(function () {
        getSTL2();
    });

    //end//
    bindCrisitEvent("#filterCritsit span", "#filterCritsit span.clusterSelect");
    
    //floating header
    function UpdateTableHeaders() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 535) {
            //add if statement, edited by  mamba
            if ($("#TICReportTable").is(":visible")) {
                $("#floatHeaderDiv").show();
            }
        }
        else {
            $("#floatHeaderDiv").hide();
        }
    }

//    function UpdateFeedback() {
//        var scrollLeft = $(window).scrollLeft();
//            $("#common_box").css("right", -parseInt(scrollLeft));
//            $("#common_box").css("position", "absolute");

//    }

    UpdateTableHeaders();
//    UpdateFeedback();
    //the commented two lines below are moved into viewReportLink's click event (edited by mamba)
    $(window).scroll(UpdateTableHeaders);
    $(window).resize(UpdateTableHeaders);
//    $(window).scroll(UpdateFeedback);
//    $(window).resize(UpdateFeedback);

    ////floating header

    $("#overlay").overlay({
        mask: {
            color: '#fff',

            loadSpeed: 200,

            opacity: 0.5
        },
        closeOnClick: false,
        onBeforeClose: function () {
       }
   }); 

    $("#close").click(function () {
       $('#overlay').overlay().close();
   });

   $("#close").mousedown(function () {
       $("#close").attr("class", "buttonClick");
   });

   $("#close").mouseup(function () {
       $("#close").attr("class", "metroButton");
   });

   $("#close").mouseover(function () {
       $("#close").attr("class", "buttonOver");
   });

   $("#close").mouseout(function () {
       $("#close").attr("class", "metroButton");
   });

   CloseDetailsBinding();

    $("#export").click(function () {
        var exportButton = $("#export");
        var host = getHostUrl();
        var type = "topissue";
        var totalSTNumber=$("#totalSTSpan").text()==null?"-":$("#totalSTSpan").text();
        var totalSRVolume=$("#totalCaseSpan").text()==null?"-":$("#totalCaseSpan").text();
        exportButton.attr("disabled", "disabled");
        $.ajax({
            url:host+ "/ExportExcel.srv",
            data: { type: type,TotalSTNumber:totalSTNumber,TotalSRVolume:totalSRVolume },
            cache: false,
            success: function (result) {
                if (result == '"-1"') {
                    $("#warningTitle").html("Export Excel Warning :");
                    $("#warningText").html("No data need to be exported, please view report first.");
                    $(".warning").overlay().load();
                }
                else if (result == '"0"') {
                    $("#warningTitle").html("Export Excel Warning :");
                    $("#warningText").html("Report columns is 0, please view report again.");
                    $(".warning").overlay().load();
                }
                else {
                    $('#iframe').attr('src', 'ExportExcel.srv?type=topissue&TotalSTNumber='+totalSTNumber+'&TotalSRVolume='+totalSRVolume);
                    $('#iframe').load();
                }
                exportButton.removeAttr("disabled");
            },
            error: function (result) {
                alert("error");
                exportButton.removeAttr("disabled");
            },
        });

    });

    $("#viewReportLink").click(function () {
        ViewReport("click");
    });

    $(".spexpandLink").live('click', function (event) {
        $(this).hide();
        var startDate = $("#startDateInput").val();
        var endDate = $("#endDateInput").val();
        var spl1 = $(this).attr('spl1');
        var spl2 = $(this).attr('spl2');
        var rowRank = $(this).attr('rank');
        var host = getHostUrl();

        $.post(
            host + "/GetContentInfo.srv",
            { startDate: startDate, endDate: endDate, spl1: spl1, spl2: spl2 },
            function (data) {
                $("#" + rowRank + "_div").hide();
                var rowList = $.parseJSON(data);
                var rowLength = rowList.length;
                var rowString = "";
                for (var i = 0; i < rowLength; i++) {
                    rowString = rowString + "<tr><td width='200px'>" + rowList[i]["ResourceURL"] + "</td><td>" +
                                                     rowList[i]["LinkCount"] + "</td><td>" +
                                                     rowList[i]["ResourceType"] + "</td><td>" +
                                                     rowList[i]["OriginationMethod"] + "</td></tr>";
                }
                var tableString = "<table>" +
                                    "<thead><tr><td>Resource URL</td><td>Usage Count</td><td>Resouce Type</td><td>Origination Method</td></tr></thead>" +
                                    "<tbody>" +
                                        rowString +
                                    "</tbody>" +
                                   "</table>";
                $("#" + rowRank + "_div").append(tableString);
                $("#" + rowRank + "_div").show("slow");
                $("#" + rowRank + "_div").goTo();
            }
        );
    });

    //get and set default data
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm }
    today = mm + '/' + dd + '/' + yyyy;
    //if the month's value is less than 7, the year should be previous year
    if (mm < 7) {
        var startDate = "07/01/" + (yyyy - 1);
        $("#startDateInput").val(startDate);
    }
    else {
        var startDate = "07/01/" + yyyy;
        $("#startDateInput").val(startDate);
    }
    $("#endDateInput").val(today);

    $("#startDateInput").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showAnim: "slideDown",
        onSelect: function (selectedDate) {
            clearRadioButton('radio', 'filterForm');
        }
    });

    $("#endDateInput").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        showAnim: "slideDown",
        onSelect: function (selectedDate) {
            clearRadioButton('radio', 'filterForm');
        }
    });
});

function clearRadioButton(radiosetname, formid) {
    var form = document.getElementById(formid);
    for (var i = 0; i < form.length; i++) {
        if (form[i].name == radiosetname) {
            document.getElementById(form[i].id).checked = false;
            $("#Span" + form[i].id).attr("class", radio_unchecked);
        }
    }
}

function getHostUrl() {
    var protocol = window.location.protocol;
    var host = window.location.host;
    return protocol + "//" + host + pathDir;
}

function CloseDetailsBinding() {
    $("#closeDetails").click(function () {
        $("#detailsView").html("");
        $('#closeDetails').attr("class", "triangle-down-click");
        $("#detailsView").fadeOut("slow");
    });

    $("#closeDetails").mousedown(function () {
        $("#closeDetails").attr("class", "triangle-down-click");
    });

    $("#closeDetails").mouseup(function () {
        $("#closeDetails").attr("class", "triangle-down");
    });

    $("#closeDetails").mouseover(function () {
        $("#closeDetails").attr("class", "triangle-down-click");
    });

    $("#closeDetails").mouseout(function () {
        $("#closeDetails").attr("class", "triangle-down");
    });
}

function CloseDetailsBindingTrend() {
    $("#closeTrend").click(function () {
        $("#trendContent").html("<div>Closing...</div>");
        $("#trendTransition").hide();
        $("#trendMask").hide();
        $('#closeTrend').attr("class", "triangle-down-click-trend");
        //$("#trendContent").fadeOut("slow");
    });

    $("#closeTrend").mousedown(function () {
        $("#closeTrend").attr("class", "triangle-down-click-trend");
    });

    $("#closeTrend").mouseup(function () {
        $("#closeTrend").attr("class", "triangle-down-trend");
    });

    $("#closeTrend").mouseover(function () {
        $("#closeTrend").attr("class", "triangle-down-click-trend");
    });

    $("#closeTrend").mouseout(function () {
        $("#closeTrend").attr("class", "triangle-down-trend");
    });
}

//----------
$(window).resize(function () {
    var stdWidth = screen.width;
    var stdHeight = screen.height;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();

    if (browserWidth < stdWidth) {
        /*$('#width').addClass('widthfix');*/
        //$('#width').css("width", stdWidth);
        $('body').addClass('overflowHidden');
        $('body').removeClass('overflowNull');
    }

    else if (browserWidth >= stdWidth) {
        $('#width').addClass('widthauto');
        $('body').addClass('overflowNull');
        $('body').removeClass('overflowHidden');
    }

    if ($('.scorecardSec')) {
        if ($('.trigger').outerHeight() > stdHeight) {
            $(".trigger").css("min-height", $('.scorecardSec').outerHeight());
        }
        else {
            $(".trigger").css("min-height", stdHeight);
        }
    }

    else {
        $(".trigger").css("min-height", stdHeight);
    }
});

$(document).ready(function () {
    $(".trigger").click(function () {
        var id = -1;
        id = $("#txtTag").val(); ;
        if (id != -1) {
            var position = $("#" + id).position();
            if (position != null) {
                if ($(this).attr('class') == 'trigger active') {
                    //$("#detailsView").animate({ "margin-left": (position.left - 955) + "px" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1000);
                }
                else {
                    //$("#detailsView").animate({ "margin-left": (position.left - 705) + "px" }, { queue: false, duration: 2000 }).animate({ borderRightWidth: "245px" }, 1000);
                }
            }
        }
        $(".panel").toggle("slow");
        $(this).toggleClass("active");
        return false;
    });

    var stdWidth = 1349;
    var stdHeight = 651;
    var browserWidth = $(window).width();
    var browserHeight = $(window).height();
    if (browserWidth < stdWidth) {
        $('#width').addClass('widthfix');
        $('body').addClass('overflowHidden');
    }

    else if (browserWidth >= stdWidth) {
        $('#width').addClass('widthauto');
        $('body').addClass('overflowNull');
    }

    $('.body').css("min-height", screen.height);
    $('.body').css("min-width", screen.width);
    if ($('.scorecardSec')) {
        if ($('.trigger').outerHeight() > screen.height) {
            $(".trigger").css("min-height", $('.scorecardSec').outerHeight());
        }
        else {
            $(".trigger").css("min-height", screen.height);
        }
    }
    else {
        $(".trigger").css("min-height", screen.height);
    }
});

//function registion
$(document).ready(function () {
    $('.scoreCard').click(function () {
        if ($('#scoreCardContent').is(':visible')) {
            $('#scoreCardContent').slideUp();
            $(this).removeClass('active').html("+ Scorecard ");
        } else {
            $('#scoreCardContent').slideDown();
            $(this).addClass('active').html("-  Scorecard ");
        }
    });
    $('.business').click(function () {
        if ($('#businessContent').is(':visible')) {
            $('#businessContent').slideUp();
            $(this).removeClass('active').html("+ Business :");
        } else {
            $('#businessContent').slideDown();
            $(this).addClass('active').html("-  Business :");
        }
    });
    $('.region').click(function () {
        if ($('#regionContent').is(':visible')) {
            $('#regionContent').slideUp();
            $(this).removeClass('active').html("+ Region :");
        } else {
            $('#regionContent').slideDown();
            $(this).addClass('active').html("-  Region :");
        }
    });
    $('.organization').click(function () {
        if ($('#organizationContent').is(':visible')) {
            $('#organizationContent').slideUp();
            $(this).removeClass('active').html("+ Organization :");
        } else {
            $('#organizationContent').slideDown();
            $(this).addClass('active').html("-  Organization :");
        }
    });
    $('a.calLnk').click(function () {
        $('a.calLnk').removeClass('calSelected');
        $(this).addClass('calSelected');
    });

    $('a.lnkScore').click(function () {
        $('a.lnkScore').css('font-weight', 'normal');
        $(this).css('font-weight', 'bold');
    });
});

var successLoadOrg = function () {
    $('#organizationContent').slideDown();
    $(".organization").addClass('active').html("-  Organization :");
    $('.organization').click(function () {
        if ($('#organizationContent').is(':visible')) {
            $('#organizationContent').slideUp();
            $(this).removeClass('active').html("+ Organization :");
        } else {
            $('#organizationContent').slideDown();
            $(this).addClass('active').html("-  Organization :");
        }
    });
}

var successLoadCat = function () {
    $(document).ready(function () {
        $(".brandAllCat .checkbox").dgStyle();
        if ($(".checkbox input").is(":checked")) {
            $(".brandAllCat").css("color", "#ffffff");
        } else {
            $(".brandAllCat").css("color", "#000000");
        }
    });
}

var successLoadBusiness = function () {
    $('#businessContent').slideDown();
    $(".business").addClass('active').html("-  Business :");
    $('.business').click(function () {

        if ($('#businessContent').is(':visible')) {

            $('#businessContent').slideUp();
            $(this).removeClass('active').html("+ Business :");
        } else {
            $('#businessContent').slideDown();
            $(this).addClass('active').html("-  Business :");
        }
    });
}

var successLoadRegion = function () {
    $('#regionContent').slideDown();
    $(".region").addClass('active').html("-  Region :");
    $('.region').click(function () {
        if ($('#regionContent').is(':visible')) {
            $('#regionContent').slideUp();
            $(this).removeClass('active').html("+ Region :");
        } else {
            $('#regionContent').slideDown();
            $(this).addClass('active').html("-  Region :");
        }
    });
}

var successLoadLob = function () {
    $(document).ready(function () {
        $(".brandAllLob .checkbox").dgStyle();
        if ($(".checkbox input").is(":checked")) {
            $(".brandAllLob").css("color", "#ffffff");
        } else {
            $(".brandAllLob").css("color", "#000000");
        }
    });
}

function ClickScore(id, value) {
    $("#ScoreCardId").val(id);
    $("#ScoreCardName").val(value);
    $("#spanScorecard").text(value);
    $(this).css('font-weight', 'bold');
    $("#orgAccord").load("_OrganizationSelect", { scorecardId: id }, successLoadOrg);
}

function ClickOrg(id, value, code) {
    $("#OrganizationId").val(id);
    $("#spanOrg").text(code);
    $("#OrganizationName").val(value);
    $(this).css('font-weight', 'bold');
    $("#businessAccord").load("_BusinessSelect", { scorecardId: $("#ScoreCardId").val(), organizationId: id }, successLoadBusiness);
    $("#regionAccord").load("_RegionSelect", { organizationId: id }, successLoadRegion);
}

function ClickBusiness(id, value) {
    $("#BusinessUnitId").val(id);
    $("#BusinessUnitName").val(value);
    $(this).css('font-weight', 'bold');
    $("#spanBusiness").text(value);
    var scoreId = $("#ScoreCardId").val();
    var orgId = $("#OrganizationId").val();
    var busId = $("#BusinessUnitId").val();
    var regId = $("#RegionId").val();
    if (regId != "" && regId != "0") {
        $("#lobAccord").load("_LOBSelect", { scorecardId: scoreId, organizationId: orgId, businessUnitId: busId, regionId: regId }, successLoadLob);
        $("#lobAccord").css("display", "inline");
    }
}

function ClickRegion(id, value) {
    $("#RegionId").val(id);
    $("#RegionName").val(value);
    $("#spanRegion").text(value);
    $(this).css('font-weight', 'bold');
    var scoreId = $("#ScoreCardId").val();
    var orgId = $("#OrganizationId").val();
    var busId = $("#BusinessUnitId").val();
    // var lobId = $("#Lob").val();
    var regId = $("#RegionId").val();
    $("#lobAccord").load("_LOBSelect", { scorecardId: scoreId, organizationId: orgId, businessUnitId: busId, regionId: regId }, successLoadLob);
    $("#lobAccord").css("display", "inline");
}

function ClickLOB(id) {
    if (!($('#' + id).is(':checked'))) {
        $('#check_all').attr('checked', false)
        GetCat();
        GetLob();

    }
    else if (($('#' + id).is(':checked'))) {
        GetCat();
        GetLob();
    }
    var scoreId = $("#ScoreCardId").val();
    var orgId = $("#OrganizationId").val();
    var busId = $("#BusinessUnitId").val();
    var lobId = $("#Lob").val();
    var regId = $("#RegionId").val();
    $("#catAccord").load("_CategorySelect", { scorecardId: scoreId, organizationId: orgId, businessUnitId: busId, regionId: regId, lineOfBusinessId: lobId }, successLoadCat);
    $("#catAccord").css("display", "inline");
}

function ClickCat(id) {
    $("#CategoryId").val(id);
    if (!($('#' + id).is(':checked'))) {
        $('#check_allcat').attr('checked', false)
    }
}

$("#LobId").click(function () {
    if ($(this).is(':checked')) alert("checked");
});

function GetLob() {
    var div = document.getElementById('lobAccord');
    var textLog = '';
    var chk = div.getElementsByTagName('input');
    var len = chk.length;

    for (var i = 0; i < len; i++) {
        if (chk[i].type === 'checkbox') {
            if (chk[i].checked) {
                if (chk[i].name.match("^lobCheck")) {
                    textLog += chk[i].name.split('_')[1] + ',';
                }
            }
        }
    }
    if (textLog != '') {
        document.getElementById('Lob').value = textLog.substring(0, textLog.length - 1);
    }
}

function GetCat() {
    var div = document.getElementById('catAccord');
    var textLog = '';
    var chk = div.getElementsByTagName('input');
    var len = chk.length;

    for (var i = 0; i < len; i++) {
        if (chk[i].type === 'checkbox') {
            if (chk[i].checked) {
                if (chk[i].name.match("^catCheck")) {
                    textLog += chk[i].name.split('_')[1] + ',';
                }
            }
        }
    }
    if (textLog != '') {
        document.getElementById('Category').value = textLog.substring(0, textLog.length - 1);
    }
}

function Validate() {
    var flag = true;
    var message = '';
    if ($("#ScoreCardId").val() == "" || $("#ScoreCardId").val() == "0") {
        message += "Please Select Scorecard Id\n";
        flag = false;
    }
    if ($("#OrganizationId").val() == "") {
        message += "Please Select Organization Id\n";
        flag = false;
    }
    if ($("#BusinessUnitId").val() == "") {
        message += "Please Select Business Unit Id\n";
        flag = false;
    }
    if ($("#RegionId").val() == "") {
        message += "Please Select Region Id\n";
        flag = false;
    }
    if ($("#Lob").val() == "") {
        message += "Please Select Lob Checkbox\n";
        flag = false;
    }
    if ($("#Category").val() == "") {
        message += "Please Select Category Checkbox\n";
        flag = false;
    }
    if ($("#Year").val() == "") {
        message += "Please Select Year\n";
        flag = false;
    }
    if ($("#Month").val() == "" || $("#Month").val() == "0") {
        message += "Please Select Month\n";
        flag = false;
    }
    if (flag == false) {
        alert(message);
    }
    return flag;
}

$(document).ready(function () {
    $('#menu').TabControl();

    var canGoback = "";
    if ('False' != null) {
        canGoback = 'False';
    }
    if (canGoback = "True") {
        if ($('#scoreCardContent').text().length > 0) {
            $('#scoreCardContent').slideDown();
            $('.scoreCard').addClass('active').html("-  Scorecard ");
        }
        if ($('#businessContent').text().length > 0) {
            $('#businessContent').slideDown();
            $('.business').addClass('active').html("-  Business :");
        }
        if ($('#regionContent').text().length > 0) {
            $('#regionContent').slideDown();
            $('.region').addClass('active').html("-  Region :");
        }
        if ($('#organizationContent').text().length > 0) {
            $('#organizationContent').slideDcown();
            $('.organization').addClass('active').html("-  Organization :");
        }
    }
});

function Prev() {
    var year = $('label[for=Year]').html();
    var prevYear = parseInt(year) - 1;
    $('label[for=Year]').html(prevYear);
    document.getElementById('Year').value = $('label[for=Year]').html();
}

function Next() {
    var year = $('label[for=Year]').html();
    var nextYear = parseInt(year) + 1;
    $('label[for=Year]').html(nextYear);
    document.getElementById('Year').value = $('label[for=Year]').html();
}

function ClickMonth(month) {
    document.getElementById('Year').value = $('label[for=Year]').html();
    document.getElementById('Month').value = month;
}

function LevelClick(id) {
    if ($('#showContent' + id) != null) {
        if ($('#showContent' + id).is(':visible')) {
            var src = $('#expandcol' + id).attr("src");
            if (src != "" && src != undefined) {
                src = src.replace('collapse-green.gif', 'expand-green.gif');
                $('#expandcol' + id).attr("src", src);
                $('#showContent' + id).slideUp();
            }
        } else {
            var src = $('#expandcol' + id).attr("src");
            if (src != "" && src != undefined) {
                src = src.replace('expand-green.gif', 'collapse-green.gif');
                $('#expandcol' + id).attr("src", src);
                $('#showContent' + id).slideDown();
            }
        }
    }
}


// Add by Arwind

function RadioClickedByTopIssue(radioid, radiosetname, formid) {
    var form = document.getElementById(formid);
    for (var i = 0; i < form.length; i++) {
        if (form[i].name == radiosetname) {
            $("#"+form[i].id).checked = false;
            $("#Span" + form[i].id).attr("class", cluster_unchecked);
        }
    }
    // - then, check the clicked button
    document.getElementById(radioid).checked = true;
    $("#Span" + radioid).attr("class", cluster_checked);
    return false;
}

//reload the product tree
function ReloadProductTree01() {
    matchString = "";
    $("#matchtextbox").val("");
    $("#tree div").html("");
    $("#productsNameList span").html("");
    o.data = [{
        "id": "All",
        "Text": "All",
        "Value": "All",
        "showcheck": false,
        complete: false,
        "isexpand": false,
        "checkstate": 0,
        "hasChildren": true,
        "ChildNodes": null,
        "Level": "0"
    }];
    identifier = true;
    treeNodesCount = 1;
    $("#txtProductTree").attr("value", "Selected 0 Item");
    selectedProducts = "";
    $("#txtProductTreeHidden").attr("value", "");
    $("#tree").treeview(o);
    $("#tree").width(230);
}

function SetProductTreeStateBySelectedLevel1()
{
    if(isTreeOrProView=="ProView")
    {
        //firstly clear the hidden field
         //store the checked values to the hidden field
        //$("#txtProductTreeHidden").attr("value","");
        var productL2="";
        var listItems = $('input[type="checkbox"][name="radio"]:checked');
        listItems.each(function (idx, ck) {
            productL2 += $(ck).val() + ",";
        });
   
        //$("#proLevel2NameHidden").attr("value",productL2.substring(0, productL2.length - 1));
        //selectedProducts is a global variable defined in the topissue page
        //selectedProducts=productL2;
        //get product level1 name by productlevel2 name
        var urlOfHandler=getHostUrl()+"/GetCommercialProLevel1Names.srv";
        var inputParameters="'"+productL2.substring(0, productL2.length - 1)+"'";
        proL2Names=inputParameters.replace(/,/g,"','");
        var proLevel1Names="";

        $.ajax({
            url:urlOfHandler,
            type:"POST",
            data:{ProL2Names:proL2Names},
            success:function(data){
                 setTimeout(function(){
                    var convertToJson=$.parseJSON(data);
                $.each(convertToJson,function(key,val){
                    proLevel1Names+=val.CommProLve1Name+",";
                    productsLevel1.push(val.CommProLve1Name);
                    $.each(val.CommProLevel3Name.split('^'),function(k,v){
                        productsLevel3.push(v);
                    });
                    //isTriggeredByRadio is a global variable defined in the topissue page
                    isTriggeredByRadio=true;
                    if($("#tree div[level='1'][title='"+val.CommProLve1Name+"'] .bbit-tree-ec-icon").attr("class")=="bbit-tree-ec-icon bbit-tree-elbow-plus")
                    {
                        $("#tree div[level='1'][title='"+val.CommProLve1Name+"'] .bbit-tree-ec-icon").click();
                    }
                    else
                    {
                    
                    }
                });
                proLevel1Names=proLevel1Names.substring(0,proLevel1Names.length-1);
                var proLevel1NamesArray=proLevel1Names.split(",");
                $("#tree div[level='1']").each(function(key,val){
                   var existInArray = $.inArray($(this).attr("title"), proLevel1NamesArray);
                   if(existInArray==-1&&$(this).children(".bbit-tree-ec-icon").attr("class")=="bbit-tree-ec-icon bbit-tree-elbow-minus")
                   {
                        $(this).children(".bbit-tree-ec-icon").click();
                   }
                });
                },0);
            
            }
        });
//        if(productL2.substring(0, productL2.length - 1)=="")
//        {
//            $("#txtProductTree").attr("value", "Selected " + "0" + " item");
//        }
//        else
//        {
//            var selectedItems=productL2.substring(0, productL2.length - 1).split(",").length;
//            if(selectedItems==1)
//            {
//                $("#txtProductTree").attr("value", "Selected " + selectedItems + " item");
//            }
//            else
//            {
//                $("#txtProductTree").attr("value", "Selected " + selectedItems + " items");
//            }
//        }
    }
    
}

function RankClicked(radioid, radiosetname, formid) {
    //isTreeOrProview is a global variable defined at the topissue page
    isTreeOrProView="ProView";

    ReloadProductTree01();

    var form = document.getElementById(formid);
    // - then, check the clicked button
    var formParent = document.getElementById("filterFormAV");
    var radiosetnameParent = "av";
    for (var i = 0; i < formParent.length; i++) {
        if (formParent[i].name == radiosetnameParent) {
            document.getElementById(formParent[i].id).checked = false;
            $("#Span" + formParent[i].id).attr("class", topIssue_unchecked_AV);
        }
    }

    if (document.getElementById(radioid).checked) {
        document.getElementById(radioid).checked = false;
        $("#Span" + radioid).attr("class", topIssue_unchecked);
    }
    else {
        document.getElementById(radioid).checked = true;
        $("#Span" + radioid).attr("class", topIssue_checked);
    }
    $("#divCheckBoxList").html("Please wait...");
    var productL2="";
    var listItems = $('input[type="checkbox"][name="radio"]:checked');
    listItems.each(function (idx, ck) {
        productL2 += $(ck).val() + ",";
    });
    $("#proLevel2NameHidden").val(productL2.substring(0, productL2.length - 1))
    //selectedProducts is a global variable defined in the topissue page
    selectedProducts="";
    var host = getHostUrl();
    $.post(
                host+"/GetProductIDByPL2.srv",
                {ProductLevel2Names:productL2.replace(/,/g,"','").substring(0,productL2.replace(/,/g,"','").length-3)},
                function(data)
                {
                    if(data=="parameter error")
                    {
                        return;
                    }
                    var dataJson=$.parseJSON(data);
                    var productId="";
                    var selectedItems=0;
                    $.each(dataJson,function(key,value){
                        productId+=value["ProductID"].toString()+",";
                        selectedItems++;
                    });
                    $("#txtProductTreeHidden").val(productId.substring(0,productId.length-1));
                    selectedProducts=productId;
                    if(selectedItems==0)
                    {
                        $("#txtProductTree").attr("value", "Selected " + "0" + " item");
                    }
                    else
                    {
                        if(selectedItems==1)
                        {
                            $("#txtProductTree").attr("value", "Selected " + selectedItems + " item");
                        }
                        else
                        {
                            $("#txtProductTree").attr("value", "Selected " + selectedItems + " items");
                        }
                    }
                    getProductInfo();

                }
            );
            $("#ProLevel2Hidden").val(productL2.substring(0, productL2.length - 1))
    ClearSelectedItems("txtTaxonomyHidden");
    
    return false;
}

function AVClicked_AV(radioid, radiosetname, formid) {

    //isTreeOrProview is a global variable defined at the topissue page
    isTreeOrProView="ProView";

    ReloadProductTree01();


    var form = document.getElementById(formid);
    var formChild = document.getElementById("filterForm");
    var radiosetnameChild = "radio";
    for (var i = 0; i < form.length; i++) {
        if (form[i].name == radiosetname) {
            document.getElementById(form[i].id).checked = false;
            $("#Span" + form[i].id).attr("class", topIssue_unchecked_AV);
        }
    }

    // - then, check the clicked button
    document.getElementById(radioid).checked = true;
    var parameters ="";
    if ($("#RadioFieldID18").attr("checked")) {
        parameters="Cloud";
    }
    else if ($("#RadioFieldID19").attr("checked")) {
        parameters="Dynamics";
    }
    else if ($("#RadioFieldID20").attr("checked")) {
        parameters = "ASG";
    }
    else if ($("#RadioFieldID21").attr("checked"))
    {
        parameters = "C&E";
    }
    getSupportTopicLevel2(parameters);
    $("#Span" + radioid).attr("class", topIssue_checked_AV);

    return false;
}


//function for get filter info
var filterDictJson;
var divCheckBoxListHeight=0;
function getProductInfo() {
    var productLevel1 ="";
    var productLevel2 ="";
    var productLevel3 ="";
    var productLevel4 ="";
    var productVersion ="";
    DisableViewReportButton();
    //var type = "quater";
    var type = "month";
    var startDate = $("#txtTimeHidden").val();
    var endDate = "";
//    var listItems = $('input[type="checkbox"][name="radio"]:checked');
//    listItems.each(function (idx, ck) {
//        productLevel2 += $(ck).val() + ",";
//    });
    
    productVersion = $("#txtProductTreeHidden").val();
    var host = getHostUrl();

    //the height of taxonomy div
    $.post(
        host + "/GetTaxonomyByProductTree.srv",
        { productLevel1: productLevel1, productLevel2: productLevel2, productLevel3: productLevel3, productLevel4: productLevel4, 
          productVersion: productVersion, type: type, startDate: startDate, endDate: endDate},
        function (data) {
            filterDictJson = $.parseJSON(data);
//            $("#searchTimeCost").text(filterDictJson.length);  //added for testing.
            if(filterDictJson==""||filterDictJson==null)
            {
                $("#txtTaxonomy").val("(No Taxonomy)");
                $("#divCheckBoxList").html("<p style='margin-top:8px'>Please select Audience View or Product View at first</p>");
                divCheckBoxListHeight=30;
            }
            else
            {
                var checkboxString = "";
                
                var checkboxHeight=16;
                var countOfCheckbox=1;//all-checkbox-->1

                checkboxString = '<input type="checkbox" id="taxonomyCheckBox" class="CheckBoxList" onchange="AppendAll(\'divCheckBoxList\',\'txtTaxonomy\',\'txtTaxonomyHidden\');" value="All" />All <br />';
                var taxonomy="";
                $.each(filterDictJson, function (key, line) {
                    checkboxString += '<input type="checkbox" id="taxonomyCheckBox" class="CheckBoxList" onchange="AppendCheckBoxInfo(\'divCheckBoxList\',\'txtTaxonomy\',\'txtTaxonomyHidden\');" value="' + line + '" checked="checked"/>' + line + '<br />';
                    countOfCheckbox=countOfCheckbox+1;
                    taxonomy+=line+"^";
                });
                $("#taxonomyHidden").val(taxonomy.substring(0,taxonomy.length-1));
                $("#divCheckBoxList").html(checkboxString);
                //the max height of divCheckBoxList is 540
                if(countOfCheckbox>34)
                {
                    divCheckBoxListHeight=34*checkboxHeight;
                }
                else if(countOfCheckbox>25&&countOfCheckbox<35)
                {
                    divCheckBoxListHeight=checkboxHeight*countOfCheckbox+8;
                }
                else
                {
                    divCheckBoxListHeight=checkboxHeight*countOfCheckbox+4;
                }
                
                AppendCheckBoxInfo('divCustomCheckBoxList', 'txtTaxonomy', 'txtTaxonomyHidden');
                EnableViewReportButton();
            }
        }
    );
}

// Used for set page restore module.
function getProductInfoFlag() {
    var productLevel1 ="";
    var productLevel2 ="";
    var productLevel3 ="";
    var productLevel4 ="";
    var productVersion ="";
    DisableViewReportButton();
    var type = "quater";
    var startDate = $("#txtTimeHidden").val();
    var endDate = "";
    var listItems = $('input[type="checkbox"][name="radio"]:checked');
    listItems.each(function (idx, ck) {
        productLevel2 += $(ck).val() + ",";
    });
    productVersion =$("#txtProductTreeHidden").val();
     //productVersion = $("#txtProductTreeHidden").val();
    var host = getHostUrl();

    //the height of taxonomy div
    $.post(
        host + "/GetTaxonomyByProductTree.srv",
        { productLevel1: productLevel1, productLevel2: productLevel2, productLevel3: productLevel3, productLevel4: productLevel4, 
          productVersion: productVersion, type: type, startDate: startDate, endDate: endDate},
        function (data) {
            filterDictJson = $.parseJSON(data);
//            $("#searchTimeCost").text(filterDictJson.length);  //added for testing.
            if(filterDictJson==""||filterDictJson==null)
            {
                $("#txtTaxonomy").val("(No Taxonomy)");
                $("#divCheckBoxList").html("<p style='margin-top:8px'>Please select Audience View or Product View at first</p>");
                divCheckBoxListHeight=30;
            }
            else
            {
                var checkboxString = "";
                
                var checkboxHeight=16;
                var countOfCheckbox=1;//all-checkbox-->1

                checkboxString = '<input type="checkbox" id="taxonomyCheckBox" class="CheckBoxList" onchange="AppendAll(\'divCheckBoxList\',\'txtTaxonomy\',\'txtTaxonomyHidden\');" value="All" />All <br />';
                var  taxonomy="";
                $.each(filterDictJson, function (key, line) {
                    checkboxString += '<input type="checkbox" id="taxonomyCheckBox" class="CheckBoxList" onchange="AppendCheckBoxInfo(\'divCheckBoxList\',\'txtTaxonomy\',\'txtTaxonomyHidden\');" value="' + line + '" checked="checked"/>' + line + '<br />';
                    countOfCheckbox=countOfCheckbox+1;
                    taxonomy+=line+"^";
                });
                $("#taxonomyHidden").val(taxonomy.substring(0,taxonomy.length-1));
                $("#divCheckBoxList").html(checkboxString);
                //the max height of divCheckBoxList is 540
                if(countOfCheckbox>34)
                {
                    divCheckBoxListHeight=34*checkboxHeight;
                }
                else if(countOfCheckbox>25&&countOfCheckbox<35)
                {
                    divCheckBoxListHeight=checkboxHeight*countOfCheckbox+8;
                }
                else
                {
                    divCheckBoxListHeight=checkboxHeight*countOfCheckbox+4;
                }
                
                AppendCheckBoxInfo('divCustomCheckBoxList', 'txtTaxonomy', 'txtTaxonomyHidden');
                EnableViewReportButton();
            }
            bindFlag = true;
            RestorePageStatus();
        }
    );
}


// Append value of Checkbox controls to Text.
//Change event for select all checkbox
function AppendAll(divID, txtID, hiddenID) {
    if ($("#"+divID+" input:checkbox:first").attr("checked")) {
        
        var selectedItems = 0;
        var itemsString = "";
        $("#" + divID + " input:checkbox").each(function (key, val) {
            $(this).attr("checked", true);
            selectedItems += 1;
            if(divID == "divCheckBoxList") {
                itemsString += $(this).val() + "^";
            }
            else {
                itemsString += $(this).val() + ",";
            }
        });
        itemsString = itemsString.substring(0, itemsString.length - 1);
        //if it's employee region hidden, just need to pass all to the stored procedure
        if(hiddenID.toLocaleLowerCase()=="txtregionhidden"||hiddenID.toLocaleLowerCase()=="txttaxonomyhidden"){
            itemsString="All";
        }
        $('#' + hiddenID).attr("value", itemsString);
        //remove all item
        selectedItems = selectedItems - 1;
        $("#" + txtID).get(0).value = "Selected all "+ selectedItems + " items";

    }
    else {
        $("#" + divID + " input:checkbox").each(function (key, val) {
            $(this).attr("checked", false);
        });
        $("#" + txtID).get(0).value = "Selected 0 item";
        ClearSelectedItems(hiddenID);
    }
    if (divID == "TimeRangeList") {
        getProductInfo();
    }
}
function AppendCheckBoxInfo(divID, txtID, hiddenID) {
    count = $("#" + divID + " input:checkbox").get().length-1;
    var selectedText = "";

    var selectedCount = 0;

    var itemsString = "";
    var totalString = "";
    $("#" + divID + " input:checkbox[value!='All']:checked").each(function () {
        if(divID == "divCustomCheckBoxList" || divID == "divCheckBoxList") {
            itemsString += $(this).val() + "^";
        }
        else {
            itemsString += $(this).val() + ",";
        }
        selectedCount += 1;

    });
    itemsString = itemsString.substring(0, itemsString.length - 1);
    $('#' + hiddenID).attr("value", itemsString);

    if (selectedCount == count) {
        $("#" + divID + " input:checkbox:first").attr("checked", true);
        totalString = "Selected all "+selectedCount+" items";
        if(hiddenID.toLocaleLowerCase()=="txtregionhidden"||hiddenID.toLocaleLowerCase()=="txttaxonomyhidden")
        {
            $('#' + hiddenID).attr("value", "All");
        }
    }
    if (selectedCount < count) {
        $("#" + divID + " input:checkbox:first").attr("checked", false);
        if (selectedCount == 1) {
            totalString = "Selected " + selectedCount + " items";
        }
        else {
            totalString = "Selected " + selectedCount + " items";
        }
    }
    if(selectedCount == 0) {
        $("#" + divID + " input:checkbox:first").attr("checked", false);
        totalString = "Selected 0 item";
    }
    $('#' + txtID).attr("value", totalString);
    if (divID == "TimeRangeList") {
        getProductInfo();
    }

                if (checkedTaxonomy != "" && bindFlag == true) {
                    var taxArray = new Array();
                    taxArray = checkedTaxonomy.split('^');
                    if(taxArray.length==1&&taxArray[0]=="All")
                    {
                        return;
                    }
                    else
                    {
                        $("#divCheckBoxList input:checkbox").each(function (key, val) {
                            $(this).attr("checked", false);
                    });
                    var count = 0;
                    $.each(taxArray, function (key, value) {
                        $("#divCheckBoxList input:checkbox").each(function (key, val) {
                            if ($(this).val() == value && $(this).val() != "All") {
                                $(this).attr("checked", true);
                                count += 1;
                            }
                        });
                    });
                    if(count == ($("#divCheckBoxList input:checkbox").length - 1)){
                        $("#divCheckBoxList input:checkbox").each(function (key, val) {
                            if ($(this).val() == "All") {
                                $(this).attr("checked", true);
                            }
                        });
                        $("#txtTaxonomy").val("Selected all "+count+" items");
                    }
                    else {
                        $("#txtTaxonomy").val("Selected "+count+" items");
                    }
                    var newitemstring = "";
                    var newitemcount = 0;
                    $("#divCheckBoxList input:checkbox[value!='All']:checked").each(function () {
                        newitemstring += $(this).val() + "^";
                        newitemcount += 1;
                    });
                    
                    newitemstring = newitemstring.substring(0, newitemstring.length - 1);
                    $('#' + hiddenID).attr("value", newitemstring);
                    }
                    
                    checkedTaxonomy ="";
            }
}

function ClearSelectedItems(txtID) {
    $('#' + txtID).attr("value", "");
}

var searchTimes = 0;
function ViewReport(action) {
    DisableViewReportButton();
    //get parameters
    $("#detailsView").fadeOut(0);
    $("#showData").hide();
    var CommercialProductLevel1Name="";
    var CommercialProductLevel3Name="";
    var proL2Names="'"+$("#ProLevel2Hidden").val()+"'";
    proL2Names=proL2Names.replace(/,/g,"','");
    if(isTreeOrProView=="ProView")
    {
//        var productL2="";
//        var listItems = $('input[type="checkbox"][name="radio"]:checked');
//        listItems.each(function (idx, ck) {
//            productL2 += $(ck).val() + ",";
//        });
   
        //get product level1&&level3 name by productlevel2 name
        var urlOfHandler=getHostUrl()+"/GetCommercialProLevel1Names.srv";
        var inputParameters="'"+$("#proLevel2NameHidden").val()+"'";
        proL2Names=inputParameters.replace(/,/g,"','");
        $.ajax({
            url:urlOfHandler,
            type:"POST",
            data:{ProL2Names:proL2Names},
            async:false,  
            success: function (data) {
                    var convertToJson=$.parseJSON(data);
                    $.each(convertToJson,function(key,val){
                    CommercialProductLevel1Name+=val.CommProLve1Name+"^";
                    CommercialProductLevel3Name+=val.CommProLevel3Name+"^";
                });
                //$("#ProLevel1Hidden").val(CommercialProductLevel1Name.substring(0,(CommercialProductLevel1Name.length-1)));
                //$("#ProLevel3Hidden").val(CommercialProductLevel3Name.substring(0,(CommercialProductLevel3Name.length-1)));
                $("#ProLevel1HiddenP").val(CommercialProductLevel1Name.substring(0,(CommercialProductLevel1Name.length-1)));
                $("#ProLevel3HiddenP").val(CommercialProductLevel3Name.substring(0,(CommercialProductLevel3Name.length-1)));
            }
        })
        
    }
    else
    {
        $("#ProLevel1HiddenP").val($("#ProLevel1Hidden").val());
        $("#ProLevel3HiddenP").val($("#ProLevel3Hidden").val());
    }
    //$("#ProLevel2Hidden").val(CommercialProductLevel2Name.replace(',','^'));
    $("#ProLevel2HiddenP").val($("#ProLevel2Hidden").val().replace(',','^'));
    

    var CommercialProductLevel2Name = "";
    var pesServiceID="";
    var cusGeoDerivedID="";
    var CommercialProductLevel2ID = "";
    var AudienceView ="";
    var avlist = $('input[type="radio"][name="av"]:checked');
    if(avlist.length >0) {
        AudienceView = avlist.attr("id");    
    }
    $("#overallInfoDiv").hide();
    $("#totalSTSpan").text("");
    $("#totalCaseSpan").text("");
    var listItems = $('input[type="checkbox"][name="radio"]:checked');
    listItems.each(function (idx, ck) {
        //CommercialProductLevel2Name += $(ck).val() + ",";
        CommercialProductLevel2ID += $(ck).attr('id')+",";
    });
    CommercialProductLevel2Name = $("#txtProductTreeHidden").val();
    cusGeoDerivedID=$("#txtcusRegionTreeHidden").val();
    pesServiceID=$("#txtOfferingTreeHidden").val();

    if(pesServiceID==""||pesServiceID==null)
    {
        pesServiceID="all";
        $("#OffLevel1HiddenP").val("All");
        $("#OffLevel2HiddenP").val("All");
        $("#OffLevel3HiddenP").val("All");
    }
    else
    {
        pesServiceID=pesServiceID.substring(0,pesServiceID.length-1);
        $("#OffLevel1HiddenP").val($("#OffLevel1Hidden").val());
        $("#OffLevel2HiddenP").val($("#OffLevel2Hidden").val());
        $("#OffLevel3HiddenP").val($("#OffLevel3Hidden").val());
    }

    if(cusGeoDerivedID==""||cusGeoDerivedID==null)
    {
        cusGeoDerivedID="all";
        $("#CusRegLevel1HiddenP").val("All");
        $("#CusRegLevel2HiddenP").val("All");
        $("#CusRegLevel3HiddenP").val("All");
    }
    else
    {
        cusGeoDerivedID=cusGeoDerivedID.substring(0,cusGeoDerivedID.length-1);
        $("#CusRegLevel1HiddenP").val($("#CusRegLevel1Hidden").val());
        $("#CusRegLevel2HiddenP").val($("#CusRegLevel2Hidden").val());
        $("#CusRegLevel3HiddenP").val($("#CusRegLevel3Hidden").val());
    }
   

    CommercialProductLevel2ID = CommercialProductLevel2ID.substring(0, CommercialProductLevel2ID.length - 1);
    var Taxonomy = $("#txtTaxonomyHidden").val();
    var Quarter = $("#txtTimeHidden").val();
    var RankType = $('input[type="radio"][name="rank"]:checked').val();
    var RankValue = $('input[type="radio"][name="top"]:checked').val();
    var critsitValue = $("#filterCritsit span.clusterSelect").text();
    var GeographyLevel3 = "";
    GeographyLevel3 = $("#txtRegionHidden").val();

    $("#txtQuaters").val(Quarter);
    $("#txtRegionDetails").val(GeographyLevel3);
    $("#txtCommercialProductLevel2Name").val(CommercialProductLevel2Name);
    $("#txtCommercialProductLevel2ID").val(CommercialProductLevel2ID);
    
    //TIC report
    //clear data
    $("#TICReportTable > tbody").empty();
    $("#TICReportTable").hide();
    var host = getHostUrl();

     $("#copyPESServicedID").val(pesServiceID);
     $("#copyProductVersion").val($("#txtProductTreeHidden").val());
     $("#copyCusGeoDerivedID").val(cusGeoDerivedID);
     
    var ranktypeID = $('input[type="radio"][name="rank"]:checked').attr("id");
    var rankvalueID = $('input[type="radio"][name="top"]:checked').attr("id");
    var critsitID = $("#filterCritsit span.clusterSelect").attr("id");

    var treeHTML = "";
    var treeID = "";
    var treeHeight = "";
    var treeWidth = "";
    var treeItems = "";
    var treeNodes = "";

    treeHTML = $("#tree").html();
    treeHTML = escape(treeHTML);
    treeHeight = $("#tree").height();
    treeWidth = $("#tree").width();
    treeID = $("#txtProductTreeHidden").val();
    treeNodes = "<all id='allid' text='all' value='all' showcheck='false' complete='true' checkstate='0' isexpand='true' hasChildren='true'>";
    treeNodes = LoopNodes(allNodes[0].ChildNodes, treeNodes, 0);
    treeNodes = treeNodes + "</all>";
    treeNodes = escape(treeNodes);
    var selectedItemsText = $("#txtProductTree").val();
    treeItems = selectedItemsText.match(/\d+/)[0];


     var offTreeHTML = "";
        var offTreeID = "";
        var offTreeHeight = "";
        var offTreeWidth = "";
        var offTreeItems = "";
        var offTreeNodes = "";

        offTreeHTML = $("#offeringTree").html();
        offTreeHTML = escape(offTreeHTML);
        offTreeHeight = $("#offeringTree").height();
        offTreeWidth = $("#offeringTree").width();
        offTreeID = pesServiceID;
        offTreeNodes = "<all id='allid' text='all' value='all' showcheck='false' complete='true' checkstate='0' isexpand='true' hasChildren='true'>";
        offTreeNodes = LoopNodes(offeringallNodes[0].ChildNodes, offTreeNodes, 0);
        offTreeNodes = offTreeNodes + "</all>";
        offTreeNodes = escape(offTreeNodes);
        selectedItemsText = $("#txtOfferingTree").val().toLowerCase();
        if (selectedItemsText == "selected all items") {
            offTreeItems = "all";
        }
        else {
            offTreeItems = selectedItemsText.match(/\d+/)[0];
        }


        var cusRegTreeHTML = "";
        var cusRegTreeID = "";
        var cusRegTreeHeight = "";
        var cusRegTreeWidth = "";
        var cusRegTreeItems = "";
        var cusRegTreeNodes = "";

        cusRegTreeHTML = $("#cusRegionTree").html();
        cusRegTreeHTML = escape(cusRegTreeHTML);
        cusRegTreeHeight = $("#cusRegionTree").height();
        cusRegTreeWidth = $("#cusRegionTree").width();
        cusRegTreeID = cusGeoDerivedID;
        cusRegTreeNodes = "<all id='allid' text='all' value='all' showcheck='false' complete='true' checkstate='0' isexpand='true' hasChildren='true'>";
        cusRegTreeNodes = LoopNodes(cusRegionallNodes[0].ChildNodes, cusRegTreeNodes, 0);
        cusRegTreeNodes = cusRegTreeNodes + "</all>";
        cusRegTreeNodes = escape(cusRegTreeNodes);
        cusRegselectedItemsText = $("#txtcusRegionTree").val().toLowerCase();
        if (cusRegselectedItemsText == "selected all items" ) {
            cusRegTreeItems = "all";
        }
        else {
            cusRegTreeItems = cusRegselectedItemsText.match(/\d+/)[0];
        }

    var rankType = $('input[type="radio"][name="rank"]:checked').val();


    // Used for display complete support topic full path or not.
    // If you want to show all, please set displayCompleteSupportTopicOnly variable to false.
    var rank = 1;
    var displayCompleteSupportTopicOnly = true;
    // Used for get 
    var availableRow = 0;

    if(action == "click")
    {
        SavePageStatusTopissue(CommercialProductLevel2ID,Quarter,Taxonomy,GeographyLevel3,ranktypeID,rankvalueID,critsitID, AudienceView, treeHTML, treeID, treeNodes, treeHeight, treeWidth, treeItems,
            rankType, "Viewreport", "Topissue",isTreeOrProView, $("#ProLevel1HiddenP").val(), $("#ProLevel2HiddenP").val(), $("#ProLevel3HiddenP").val(), "",offTreeHTML,offTreeID,offTreeNodes,offTreeHeight,offTreeWidth,offTreeItems, $("#OffLevel1HiddenP").val(), $("#OffLevel2HiddenP").val(), $("#OffLevel3HiddenP").val(),cusRegTreeHTML,cusRegTreeID,cusRegTreeNodes,cusRegTreeHeight,cusRegTreeWidth,cusRegTreeItems,$("#CusRegLevel1HiddenP").val(),$("#CusRegLevel2HiddenP").val(),$("#CusRegLevel3HiddenP").val());
    }
    $("#loadImageDiv").show();
    TimerStart();
    $.post(
            host + "/GetSupportTopicByTimeRange.srv",
            { CommercialProductLevel2Name: CommercialProductLevel2Name, Taxonomy: Taxonomy, GeographyLevel3: GeographyLevel3, TimeRangeType: "months", TimeRangeValue: Quarter, RankType: RankType, RankValue: RankValue, critsitValue:critsitValue,InputPESServiceID: pesServiceID, CustomerGeographyDerivedID: cusGeoDerivedID },
            function (data) {
                TimerStop();  
                $("#loadImageDiv").hide();
                $("#showData").hide();
                $(".saveAction").show();
                var rowList = $.parseJSON(data); //ticList
                var rowLength = rowList.length;
                if (rowLength < 1) {
                    if(searchTimes == 1)
                    {
                        $("#showData").show();
                        EnableViewReportButton();
                        return;
                    }
                    else
                    {
                        ViewReport("retry");
                        searchTimes +=1;
                        return;
                    }
                }
                var rowString = "";
                var contentRowString = "";
                var contentRowLength = 0;
                var backgroundColor;

                //set overall info
                var totalVolume = 0;
                var totalLabor = 0;
                $("#overallInfoDiv").show();

                $("#totalSTSpan").text(rowLength.toString());

                for (var i = 0; i < rowLength; i++) {
                    if(parseInt(rowList[i]["Volume"]) != -1)
                    {
                        totalVolume += parseInt(rowList[i]["Volume"]);
                        totalLabor += parseInt(rowList[i]["Labor"]);
                    }
                }
                $("#totalCaseSpan").text(totalVolume);
                for (var i = 0; i < rowLength; i++) {
//                    if (i % 2 == 0) {
//                        backgroundColor = "#D3DFEE";
//                    } else {
//                        backgroundColor = "#fff";
//                    }
                    if (backgroundColor == "#D3DFEE") {
                        backgroundColor = "#D3DFEE";
                    }
                    else {
                        backgroundColor = "#fff";
                    }

                    if (contentRowLength == 0) {
                        contentRowString = "<td></td><td></td><td></td><td></td><td></td><td></td></tr>";
                    }
                    var totalB = 0;
                    if (rowList[i]["TB"] != -1) {
                        totalB += rowList[i]["TB"];
                    }
                    if (rowList[i]["MB"] != -1) {
                        totalB += rowList[i]["MB"];
                    }
                    if (rowList[i]["BB"] != -1) {
                        totalB += rowList[i]["BB"];
                    }
                    var TB = 0;
                    var BB = 0;
                    var laborP = 0;
                    var volumeP = 0;
                    var critsit = 0;
                    if (totalB > 0) {
                        if (rowList[i]["TB"] != -1) {
                            if (totalB == 0) {
                                TB = "0";
                                TB += "%";
                            }
                            else {
                                TB = ((rowList[i]["TB"] / totalB) * 100).toFixed(1);
                                TB += "%";
                            }
                        }
                        else {
                            TB = "0";
                            TB += "%";
                        }
                        if (rowList[i]["BB"] != -1) {
                            if (totalB == 0) {
                                BB = "0";
                                BB += "%";
                            }
                            else {
                                BB = ((rowList[i]["BB"] / totalB) * 100).toFixed(1);
                                BB += "%";
                            }
                        }
                        else {
                            BB = "0";
                            BB += "%";
                        }
                    }
                    else {
                        TB = "-";
                        BB = "-";
                        totalB = totalB;
                    }
                    if (totalLabor != 0) {
                        laborP = ((rowList[i]["Labor"] / totalLabor) * 100);
                    }
                    if (totalVolume != 0) {
                        volumeP = ((rowList[i]["Volume"] / totalVolume) * 100);
                    }
                    if (rowList[i]["Critsit"]) {
                        critsit = rowList[i]["Critsit"];
                    }
                    var TMPI;
                    var volume;
                    var labor;
                    var SupportTopicDerivedID = rowList[i]["SupportTopicDerivedID"];

                    if (SupportTopicDerivedID == -1) {
                        $("#warningTitle").html("View Report :");
                        $("#warningText").html("Cannot find details about current Support Topic.");
                        $(".warning").overlay().load();
                    }

                    if (rowList[i]["AvgTMPI"] == -1) {
                        TMPI = "-";
                    }
                    else {
                        TMPI = rowList[i]["AvgTMPI"].toFixed(0);
                    }
                    if (rowList[i]["Volume"] == -1) {
                        volume = "-";
                        volumeP = "-";
                    }
                    else {
                        volume = rowList[i]["Volume"];
                        volumeP = volumeP.toFixed(1);
                        volumeP += "%";
                    }
                    if (rowList[i]["Labor"] == -1) {
                        labor = "-";
                        laborP = "-";
                    }
                    else {
                        labor = rowList[i]["Labor"].toFixed(0);
                        laborP = laborP.toFixed(1);
                        laborP += "%";
                    }
                    var SupportTopicCount = rowList[i]["SupportTopicFullPath"].split('\\').length;
                    var level2 = rowList[i]["CommercialProductLevel2Name"];
                    var fullArray = rowList[i]["SupportTopicFullPath"].split("\\");
                    var fullpath = "";
                    $.each(fullArray, function(key, value) {
                        fullpath +=  value  + "^";
                    });
                    fullpath = fullpath.substring(0,fullpath.length - 1);

                    //----------------

                    if (displayCompleteSupportTopicOnly) {
                        if (SupportTopicCount > 2) {
                            rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + rank + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='BA" + i + "' tag='" + SupportTopicDerivedID + "'  href='#BB" + i + "' ><img id='imgBA"+i+"' class='TrendImage'   "+
                            "onclick='TrendClickEvent(\"BA"+ i +"\", \""+ Quarter +"\" ,\""+SupportTopicDerivedID+"\",\""+level2+"\",\""+fullpath+"\",\""+laborP+
                            "\",\""+labor+"\",\""+TMPI+"\",\""+volumeP+"\",\""+volume+"\",\""+TB+"\",\""+BB+"\",\""+totalB+"\");' /></a><a style='display:none;'>BB" + i + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["CommercialProductLevel2Name"] + "</td>" +
                            "<td style=\'text-align:left;padding-left:20px;\' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["SupportTopicFullPath"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + laborP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + labor + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TMPI + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + volumeP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='AB" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"AB" + i + "\", \""+ rowList[i]["CommercialProductLevel2Name"] +"\", \""+ fullpath +"\")' href='#AA" + i + "' >" + volume + "</a><a style='display:none;'>AA" + i + "</a></td>" +

"<td rowspan=" + (contentRowLength + 1) + "><a id='critsit" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"critsit" + i + "\", \"" + rowList[i]["CommercialProductLevel2Name"] + "\", \"" + fullpath +"\",\"crisitColumn\")' href='#AA" + i + "' >" + critsit + "</a><a style='display:none;'>AA" + i + "</a></td>" +


                            "<td rowspan=" + (contentRowLength + 1) + ">" + TB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + BB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='SV" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"SV" + i + "\", \""+ rowList[i]["CommercialProductLevel2Name"] +"\", \""+ fullpath +"\",\"surveyVol\")' href='javascript:void(0)' >" + totalB + "</a></td>"

                            $("#TICReportTable>tbody").append(rowString);
                            rank += 1;
                            if (backgroundColor == "#D3DFEE") {
                                backgroundColor = "#fff";
                            }
                            else {
                                backgroundColor = "#D3DFEE";
                            }
                            availableRow += 1;
                        }
                    }
                    else
                    {
                        rowString = "<tr style='background-color:" + backgroundColor + "'>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + (i + 1).toString() + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='BA" + i + "' tag='" + SupportTopicDerivedID + "'  href='#BB" + i + "' ><img id='imgBA" + i + "' class='TrendImage'   " +
                            "onclick='TrendClickEvent(\"BA"+ i +"\", \""+ Quarter +"\" ,\""+SupportTopicDerivedID+"\",\""+level2+"\",\""+fullpath+"\",\""+laborP+
                            "\",\""+labor+"\",\""+TMPI+"\",\""+volumeP+"\",\""+volume+"\",\""+TB+"\",\""+BB+"\",\""+totalB+"\");' /></a><a style='display:none;'>BB" + i + "</a></td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["CommercialProductLevel2Name"] + "</td>" +
                            "<td style=\'text-align:left;padding-left:20px;\' rowspan=" + (contentRowLength + 1) + ">" + rowList[i]["SupportTopicFullPath"] + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + laborP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + labor + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + TMPI + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + volumeP + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='AB" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"AB" + i + "\", \""+ rowList[i]["CommercialProductLevel2Name"]+"\", \""+ fullpath +"\")' href='#AA" + i + "' >" + volume + "</a><a style='display:none;'>AA" + i + "</a></td>" +
"<td rowspan=" + (contentRowLength + 1) + "><a id='critsit" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"critsit" + i + "\", \"" + rowList[i]["CommercialProductLevel2Name"] + "\", \"" + fullpath + "\",\"crisitColumn\")' href='#AA" + i + "' >" + critsit + "</a><a style='display:none;'>AA" + i + "</a></td>" +

                            "<td rowspan=" + (contentRowLength + 1) + ">" + TB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + ">" + BB + "</td>" +
                            "<td rowspan=" + (contentRowLength + 1) + "><a id='SV" + i + "' tag='" + SupportTopicDerivedID + "'  onclick='enable(\"SV" + i + "\", \""+ rowList[i]["CommercialProductLevel2Name"] +"\", \""+ fullpath +"\",\"surveyVol\")' href='javascript:void(0)' >" + totalB + "</a></td>"

                        $("#TICReportTable>tbody").append(rowString);
                    }
                    contentRowLength = 0;
                    contentRowString = "";
                    rowString = "";
                }

                
                    $('#close').click(function (e) {
                        $("#trendTransition").hide();
                        $("#trendMask").hide();
                    });
                $("#TICReportTable").show("slow");
                searchTimes = 0;

                                    // Change case number.
                    if (displayCompleteSupportTopicOnly) {
                        $("#totalSTSpan").text((rank - 1).toString());
                    }

                    // When no available row. hide
                    if (displayCompleteSupportTopicOnly && availableRow != 0) {
                        $("#TICReportTable").show("slow");
                        $("#TICReportTable2").show("slow");
                    }
                    else {
                        $("#showData").show();
                        EnableViewReportButton();
                        $("#totalSTSpan").text("");
                        $("#totalCaseSpan").text("");
                        return;
                    }
                EnableViewReportButton();
            }
        );
}

function LoopNodes(nodes, str, level) {
        var xmlStr1 = "";
        level = level + 1;
        $.each(nodes, function (key, val) {
            if (val.ChildNodes != null) {
                str = str + "<SupportLevel" + level + " id='" + val.id + "' text='" + escape(val.Text) + "' value='" + escape(val.Value) + "' showcheck='" + val.showcheck + "' complete='" + val.complete + "' checkstate='" + val.checkstate + "' isexpand='" + true + "' hasChildren='" + val.hasChildren + "'>";
                xmlStr1 = LoopNodes(val.ChildNodes, str, level);
                str = xmlStr1;
            }
            else {
                str = str + "<SupportLevel" + level + " id='" + val.id + "' text='" + escape(val.Text) + "' value='" + escape(val.Value) + "' showcheck='" + val.showcheck + "' complete='" + val.complete + "' checkstate='" + val.checkstate + "' isexpand='" + false + "' hasChildren='" + val.hasChildren + "'>";
            }
            str = str + "</SupportLevel" + level + ">";
            xmlStr1 = str;
        });
        return xmlStr1;
    }

function TrendClickEvent(trendID, Quarter, SupportTopicDerivedID, level2, fullpath, laborP, labor, TMPI, volumeP, volume, TB, BB, totalB)
{
    $("#trendMask").css("height",$(document).height());
    $("#trendMask").fadeTo(500, 0.25);
    $("#trendContent").html("<div>Loading..</div>");
    var $t = $('#trendTransition'),
        to = $("#"+trendID).offset();
    var height = screen.height;
    var width = $(document).width();
    var top = $(window).scrollTop();
    $('#trendContent').css({ width: 60, height: 60 });
    $('#trendContent').css("background","#4F81BD");
    $t.css({
        top: to.top,
        left: to.left,
        display: 'block'
    }).animate({
        top: height / 2 + top,
        left: width / 2
    }, 600, function () {
        $(this).animate({
            top: height*0.15  + top,
            left: width*0.2
        }, 600);
        $('#trendContent').animate({
            width: 996.09,
            height: 644
        }, 600, function () {
            // open dialog here
            showTrendingWindow(trendID, Quarter, SupportTopicDerivedID, level2,
                escape(fullpath), laborP, labor, TMPI, volumeP, volume, TB, BB, totalB);
            CloseDetailsBindingTrend();
        });
    });
}

var checkedTaxonomy ="";
function RestorePageStatus()
{
    var host = getHostUrl();
    var IsPostBack = $("#txtPostBack").val();  

    if (IsPostBack == "true") {  
        $("#txtPostBack").val("false");
        var guid = getUrlVars()["guid"];
        if(guid === undefined){      
        }
        else
        {
           $("#txtGuid").val(guid);
           $.ajax({
               url: host+"/RestorePageStateHandler.srv",
                data: { guid: guid},
                type: "POST",
                cache: false,
                success: function (result) {
                    var rowList = $.parseJSON(result);
                    if(rowList.length < 1){
                        $("#warningTitle").html("Restore Page Status :");
                        $("#warningText").html("No related filter info.");
                        $(".warning").overlay().load();
                        return;
                    }
                    // Restore hidden text
                    $("#txtTaxonomyHidden").val(rowList.Taxonomy);
                    $("#txtRegionHidden").val(rowList.Region);
                    $("#txtQuaters").val(rowList.Quaters);
                    $("#txtRegionDetails").val(rowList.Region);
                    $("#txtCommercialProductLevel2Name").val(rowList.CommercialProductLevel2ID);
                    $("#txtTimeHidden").val(rowList.Quaters);
                    $("#txtProductTreeHidden").val(rowList.TreeID);
                    $("#copyProductVersion").val(rowList.TreeID);
                    $("#copyPESServicedID").val(rowList.OffTreeID);
                    $("#txtOfferingTreeHidden").val(rowList.OffTreeID);
                    $("#ProLevel1Hidden").val(rowList.ProductLevel1)
                        $("#ProLevel2Hidden").val(rowList.ProductLevel2)
                        $("#ProLevel3Hidden").val(rowList.ProductLevel3)
                        $("#OffLevel1Hidden").val(rowList.OffLevel1)
                        $("#OffLevel2Hidden").val(rowList.OffLevel2)
                        $("#OffLevel3Hidden").val(rowList.OffLevel3)
                    // Restore product level2 radio button.
                    var commercialProductLevel2ID = rowList.CommercialProductLevel2ID;
                    var idArray = new Array();
                    idArray = commercialProductLevel2ID.split(',');
                    $.each(idArray, function (key, value) {
                        $("#" + value).attr("checked", true);
                        $("#Span" + value).attr("class", topIssue_checked);
                        isTreeOrProView=="ProView";
                    });

                    // Restore Tree.
                    var treeNodes = escapeText(unescape(rowList.TreeNodes));
                    treeNodes = $.parseXML(treeNodes);
                    var treeHTML = unescape(rowList.TreeHtml);
                    var $rootNode = $(treeNodes).find("all");
                    var root = {
                        "id": $rootNode.attr("id"),
                        "Text": $rootNode.attr("text"),
                        "value": $rootNode.attr("value"),
                        "showcheck": $rootNode.attr("showcheck") == "true" ? true : false,
                        complete: $rootNode.attr("complete") == "true" ? true : false,
                        "isexpand": $rootNode.attr("isexpand") == "true" ? true : false,
                        "checkstate": $rootNode.attr("checkstate"),
                        "hasChildren": $rootNode.attr("hasChildren") == "true" ? true : false,
                        "Level": "0"
                    }
                    if ($(treeNodes).find("all").children().length > 0) {
                        var nodesList = CreateDataSource(root, $(treeNodes).find("all").children(), 0)
                        root["ChildNodes"] = nodesList;
                        o.data = [root];
                        identifier = false;
                        $("#tree").treeview(o);
                        $("#tree").width(parseInt(rowList.TreeWidth));
                        $("#closeTreeDiv").width(parseInt(rowList.TreeWidth));
                        $("#searchDiv").width(parseInt(rowList.TreeWidth));
                        $(".searchtextbox").width(parseInt(rowList.TreeWidth) - 10);
                        $("#productsNameList").width(parseInt(rowList.TreeWidth));
                        $("#calculatingDiv").width(parseInt(rowList.TreeWidth));
                        $("#tree").height(parseInt(rowList.TreeHeight));
                        $("#closeTreeDiv").height(parseInt(rowList.TreeHeight) + 20);
                        $("#calculatingDiv").height(parseInt(rowList.TreeHeight));
                        $("#calculatingPar").css("margin-top", ((parseInt(rowList.TreeHeight) + 28 - 72) / 2));
                        $("#txtProductTree").attr("value", "Selected " + rowList.TreeItems + " items");
//                        selectedProducts = rowList.TreeID + ",";
//                        $("#txtProductTreeHidden").attr("value", selectedProducts);
                    }

                    //restore Offering Tree
                        var offTreeNodes = unescape(rowList.OffTreeNodes);
                        offTreeNodes = $.parseXML(offTreeNodes);
                        var offTreeHTML = unescape(rowList.OffTreeHtml);
                        var $offRootNode = $(offTreeNodes).find("all");
                        var offRoot = {
                            "id": $offRootNode.attr("id"),
                            "Text": $offRootNode.attr("text"),
                            "value": $offRootNode.attr("value"),
                            "showcheck": $offRootNode.attr("showcheck") == "true" ? true : false,
                            complete: $offRootNode.attr("complete") == "true" ? true : false,
                            "isexpand": $offRootNode.attr("isexpand") == "true" ? true : false,
                            "checkstate": $offRootNode.attr("checkstate"),
                            "hasChildren": $offRootNode.attr("hasChildren") == "true" ? true : false,
                            "Level": "0"
                        }
                        if ($(offTreeNodes).find("all").children().length > 0) {
                            var nodesList = CreateDataSource(offRoot, $(offTreeNodes).find("all").children(), 0)
                            offRoot["ChildNodes"] = nodesList;
                            offeringTree.data = [offRoot];
                            identifierForOfferingTree = false;
                            $("#offeringTree").offeringtreeview(offeringTree);

                            $("#offeringTree").height(parseInt(rowList.OffTreeHeight));
                            $("#closeOfferingTreeDiv").height(parseInt(rowList.OffTreeHeight) + 20);
                            $("#calculatingDiv").height(parseInt(rowList.OffTreeHeight));

                            $("#offeringTree").width(parseInt(rowList.OffTreeWidth));
                            $("#closeOfferingTreeDiv").width(parseInt(rowList.OffTreeWidth));
                            $("#searchOffTrDiv").width(parseInt(rowList.OffTreeWidth));
                            $("#offTrMatchTextbox").width(parseInt(rowList.OffTreeWidth) - 10);
                            $("#offeringNameList").width(parseInt(rowList.OffTreeWidth));
                            $("#calculatingDiv").width(parseInt(rowList.OffTreeWidth));

                            $("#calculatingPar").css("margin-top", ((parseInt(rowList.OffTreeHeight) + 28 - 72) / 2));
                            $("#txtOfferingTree").attr("value", "Selected " + rowList.OffTreeItems + " items");
                            offeringselectedProducts = rowList.OffTreeID + ",";
                            $("#txtOfferingTreeHidden").attr("value", offeringselectedProducts);

                        }


                    //restore customer region Tree
                        var cusRegTreeNodes = unescape(rowList.CusRegTreeNodes);
                        cusRegTreeNodes = $.parseXML(cusRegTreeNodes);
                        var cusRegTreeHTML = unescape(rowList.CusRegTreeHtml);
                        var $cusRegRootNode = $(cusRegTreeNodes).find("all");
                        var cusRegRoot = {
                            "id": $cusRegRootNode.attr("id"),
                            "Text": $cusRegRootNode.attr("text"),
                            "value": $cusRegRootNode.attr("value"),
                            "showcheck": $cusRegRootNode.attr("showcheck") == "true" ? true : false,
                            complete: $cusRegRootNode.attr("complete") == "true" ? true : false,
                            "isexpand": $cusRegRootNode.attr("isexpand") == "true" ? true : false,
                            "checkstate": $cusRegRootNode.attr("checkstate"),
                            "hasChildren": $cusRegRootNode.attr("hasChildren") == "true" ? true : false,
                            "Level": "0"
                        }
                        if ($(cusRegTreeNodes).find("all").children().length > 0) {
                            var nodesList = CreateDataSource(cusRegRoot, $(cusRegTreeNodes).find("all").children(), 0)
                            cusRegRoot["ChildNodes"] = nodesList;
                            cusRegionTree.data = [cusRegRoot];
                            identifierForCusRegTree = false;
                            $("#cusRegionTree").cusRegiontreeview(cusRegionTree);

                            $("#cusRegionTree").height(parseInt(rowList.CusRegTreeHeight));
                            $("#closecusRegionTreeDiv").height(parseInt(rowList.CusRegTreeHeight) + 20);
                            $("#calculatingDiv").height(parseInt(rowList.CusRegTreeHeight));

                            $("#cusRegionTree").width(parseInt(rowList.CusRegTreeWidth));
                            $("#closecusRegionTreeDiv").width(parseInt(rowList.CusRegTreeWidth));
                            $("#searchcusRegionTreeDiv").width(parseInt(rowList.CusRegTreeWidth));
                            $("#cusRegionTrMatchTextbox").width(parseInt(rowList.CusRegTreeWidth) - 10);
                            $("#cusRegionNamesList").width(parseInt(rowList.CusRegTreeWidth));
                            $("#calculatingDiv").width(parseInt(rowList.CusRegTreeWidth));

                            $("#calculatingPar").css("margin-top", ((parseInt(rowList.CusRegTreeHeight) + 28 - 72) / 2));
                            $("#txtcusRegionTree").attr("value", "Selected " + rowList.CusRegTreeItems + " items");
                            cusRegionselectedProducts = rowList.CusRegTreeID + ",";
                            $("#txtcusRegionTreeHidden").attr("value", cusRegionselectedProducts);

                        }


                    // Restore quaters dropdownlist.
                    var quaters = rowList.Quaters;
                    if (quaters != "") {
                        var qaArray = new Array();
                        qaArray = quaters.split(',');
                        $("#TimeRangeList input:checkbox").each(function (key, val) {
                                $(this).attr("checked", false);
                        });
                        var count = 0;
                        $.each(qaArray, function (key, value) {
                            $("#TimeRangeList input:checkbox").each(function (key, val) {
                                if ($(this).val() == value) {
                                    $(this).attr("checked", true);
                                    count += 1;
                                }
                            });
                        });
                        if(count == ($("#TimeRangeList input:checkbox").length)){
                            $("#txtTime").val("Selected all "+(count-1)+" items");
                        }
                        else {
                            $("#txtTime").val("Selected "+count+" items");
                        }
                    }

                    // Restore Region dropdownlist
                    var region = rowList.Region;
                    if (region != "") {
                        var reArray = new Array();
                        reArray = region.split(',');
                        $("#RegionList input:checkbox").each(function (key, val) {
                                $(this).attr("checked", false);
                        });
                        var count = 0;
                        $.each(reArray, function (key, value) {
                            $("#RegionList input:checkbox").each(function (key, val) {
                                if (region == "All") {
                                    $(this).attr("checked", true);
                                }
                                else {
                                    if ($(this).val() == value) {
                                        $(this).attr("checked", true);
                                        count += 1;
                                    }
                                }
                            });
                        });
                        if(region == "All"){
                            $("#txtRegion").val("Selected all items");
                        }
                        else {
                            $("#txtRegion").val("Selected "+count+" items");
                        }
                    }
                
                    var ranktype = rowList.RankType;
                    $("#RadioFieldID10").attr("checked", false);
                    $("#SpanRadioFieldID10").attr("class", cluster_unchecked);
                    $("#" +ranktype).attr("checked", true);
                    $("#Span" +ranktype).attr("class", cluster_checked);

                    var rankvalue = rowList.RankValue;
                    $("#RadioFieldID13").attr("checked", false);
                    $("#SpanRadioFieldID13").attr("class", cluster_unchecked);
                    $("#" +rankvalue).attr("checked", true);
                    $("#Span" +rankvalue).attr("class", cluster_checked);

                    //set CritsitID
                    var critsitId = rowList.CritsitID;
                    $("#filterCritsit span.clusterSelect").each(function() {
                        $(this).attr("class", cluster_unchecked);
                        });
                    $("#" +critsitId).attr("class", cluster_checked);

                    var av = rowList.AudienceView;
                    if(av != "") {
                        $("#"+av).attr("checked", true);
                        $("#Span"+av).attr("class", topIssue_checked_AV);
                    }

                    // Re-binding taxonomy by product level2 and remember selected taxonomy items.
                    checkedTaxonomy = rowList.Taxonomy;
                    getProductInfo();
                    ViewReport("restore");
                },
                error: function (result) {
                   alert("error");
                }
            });
        }
    } 
    else{
        
    }
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function enable(id, level2,fullpath,type) {
    $("#detailsView").fadeOut(0);
    var position = $("#" + id).position();
    $("#txtTag").val(id);
    $("#detailsView").css("width", 590);
    $(".nestedtableDiv").css("width", 543);
    $(".nestedtableDiv").css("height", 247);
    $("#detailsView").attr("class", "org_box");
    var Quaters = $("#txtQuaters").val();
    var Region = $("#txtRegionDetails").val();
    var SupportTopicDerivedID = -1;
    var link = $("#" + id);
    var count;
    var height;
    var CommercialProductLevel2Name = level2;
    SupportTopicDerivedID = link.attr("tag");
    count = link.text();
    if (count >= 8) {
        height = 392;
    }
    else if (count < 1) {
        height = 114;
    }
    else {
        height = 114 + count * 31;
    }
    if (link == null) {
        $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Support Topic ID not in line...</p>");
        $("#detailsView").css("height", height);
    }
    else if (SupportTopicDerivedID == null) {
        $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Support Topic ID missed...</p>");
        $("#detailsView").css("height", height);
    }
    else {
        if(type=="surveyVol")
        {
            GetDetailsViewForSurVol(Quaters, Region, SupportTopicDerivedID, CommercialProductLevel2Name, height,fullpath);
        }
        else
        {
            GetDetailsView(Quaters, Region, SupportTopicDerivedID, CommercialProductLevel2Name, height,fullpath,type);
        }
    }
    $("#detailsView").fadeIn('slow');
    if ($(".trigger").attr('class') == 'trigger active') {
        $("#detailsView").css("left", (position.left - 955) + "px");
    } else {
        $("#detailsView").css("left", (position.left - 620) + "px");
    }
    $("#detailsView").css("top", (position.top - 10) + "px");
    CloseDetailsBinding();
    return false;
}

function GetDetailsView(Quaters, Region, SupportTopicDerivedID, CommercialProductLevel2Name, height,fullpath,columnType) {
    $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Please wait...</p>");
    $("#detailsView").css("height", height);
    var host = getHostUrl();
    var pesServicedId = $("#copyPESServicedID").val();
    var productVersion = $("#copyProductVersion").val();
    if (!columnType) {
        columnType = '';
    }
    $.post(host + "/GetTopIssueDetails.srv",
        { SupportTopicDerivedID: SupportTopicDerivedID, Quaters: Quaters, Region: Region, CommercialProductLevel2Name: productVersion, PESServiceID: pesServicedId, columnType: columnType },
        function (data) {
            document.location.hash = "?guid=" +$("#txtGuid").val();
            var pathArray = unescape(fullpath).split("^");
            var path = "";
            $.each(pathArray, function (key, value) {
                path += value + "\\";
            });
            var rowList = $.parseJSON(data);
            var rowLength = rowList.length;
            if (rowLength < 1) {
                $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>There's no details data.</p>");
                $("#detailsView").css("height", height);
                CloseDetailsBinding();
                return;
            }
            var displayItem = 1;
            if (rowLength >= 8) {
                displayItem = 8;
            }
            else {
                displayItem = rowLength;
            }
            $("#detailsView").css("height", (114 + (31 * displayItem)));
            var contentString = "";
            for (var i = 0; i < rowLength; i++) {
                var title;
                var ServiceRequestNumber;
                var cts_tmpi;
                if ($.trim(rowList[i]["Title"]) == "") {
                    title = "-";
                }
                else {
                    if (len($.trim(rowList[i]["Title"])) > 50) {
                        if (len($.trim(rowList[i]["Title"])) == $.trim(rowList[i]["Title"]).length) {
                            title = $.trim(htmlEncode(rowList[i]["Title"])).substring(0, 50) + "...";
                        }
                        else {
                            title = $.trim(htmlEncode(rowList[i]["Title"])).substring(0, 50/2) + "...";
                        }
                    }
                    else {
                        title = htmlEncode(rowList[i]["Title"]);
                    }
                }
                if (rowList[i]["ServiceRequestNumber"] == -1) {
                    ServiceRequestNumber = NaN;
                }
                else {
                    ServiceRequestNumber = rowList[i]["ServiceRequestNumber"];
                }
                if (rowList[i]["CTS_TMPI"] == -1) {
                    cts_tmpi = NaN;
                }
                else {
                    cts_tmpi = rowList[i]["CTS_TMPI"];
                }

                contentString += "<tr><td width='6%'>" + (i + 1) + "</td><td width='20%' name='ServiceRequestNumber'>" + ServiceRequestNumber + "</td><td width='61%' style=\'text-align:left;padding-left:10px;\'>" +
                        title + "</td><td width='13%'>" + cts_tmpi + "</td></tr>";

            }

            $("#detailsView").html("<span class='org_box_cor cor1'></span><div class='nestedHeader'>" +
                                   "<a href='#CSTC' class='nestedFunctionFront' id='CopySR' onclick='copySR();'>Copy SR to Clipboard</a><a style='display:none;'>" +
                                   "CSTC</a><a href='#ETE' class='nestedFunction' id='DetailsExport' >Export to Excel</a><a style='display:none;'>" +
                                   "ETE</a><div class='triangle-down' id='closeDetails'></div>" +
                                   "<table class='headertable' id='headertable'><thead><tr class='nestedtableHeader'><td width='6%'>Rank</td><td width='20%'>Request Number</td>" +
                                   "<td width='61%'>Title</td><td width='13%'>TMPI(min)</td></tr></thead></table></div>" +
                                   "<div  class='nestedtableDiv' id='nestedtableDiv'><table class='nestedtable' id='nestedtable1'>" + contentString + "</table></div>");
            CloseDetailsBinding();
            if (rowLength <= 8) {
                $(".nestedtableDiv").css("width", 538);
            }
            if (displayItem < 8) {
                $(".nestedtableDiv").css("height", 1 + (31 * displayItem));
            }
            $('#nestedtable1').tableUI();
            exportDetailsView();

            // Prepare State data.

            var commProL2ID=$("#txtCommercialProductLevel2ID").val();
            var quaters=$("#txtQuaters").val();
            var region=$("#txtRegionHidden").val();
            var taxonomy = $("#taxonomyHidden").val();
            var taxonomySelected = $("#txtTaxonomyHidden").val();
            var rankType= $('input[type="radio"][name="rank"]:checked').val();
            var audienceView="";

            if(isTreeOrProView.toLocaleLowerCase()=="proview")
            {
                var avlist = $('input[type="radio"][name="av"]:checked');
                if(avlist.length >0) {
                    audienceView = avlist.attr("id");    
                }
            }
            var productLevel1 = $("#ProLevel1HiddenP").val();
            var productLevel2 = $("#ProLevel2HiddenP").val();
            var productLevel3 = $("#ProLevel3HiddenP").val();

            var offeringLevel1=$("#OffLevel1HiddenP").val();
            var offeringLevel2=$("#OffLevel2HiddenP").val();
            var offeringLevel3=$("#OffLevel3HiddenP").val();

            var cusRegLevel1=$("#CusRegLevel1HiddenP").val();
            var cusRegLevel2=$("#CusRegLevel2HiddenP").val();
            var cusRegLevel3=$("#CusRegLevel3HiddenP").val();
            SavePageStatusTopissue(commProL2ID, quaters, "", region, rankType, "", audienceView, "", "", "", "", "", "",
                rankType, "Drilldown", "TopIssue", isTreeOrProView, productLevel1, productLevel2, productLevel3, path,"","","","","","",offeringLevel1,offeringLevel2,offeringLevel3,"","","","","","",cusRegLevel1,cusRegLevel2,cusRegLevel3);
        });
}


function GetDetailsViewForSurVol(Quaters, Region, SupportTopicDerivedID, CommercialProductLevel2Name, height,fullpath) {
    $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>Please wait...</p>");
    $("#detailsView").css("height", height);
    var host = getHostUrl();
    var pesServicedId = $("#copyPESServicedID").val();
    var productVersion=$("#copyProductVersion").val();
    $.post(host + "/GetTopIssueSurveyVolDetails.srv",
        { SupportTopicDerivedID: SupportTopicDerivedID, Quaters: Quaters, Region: Region, CommercialProductLevel2Name : productVersion,PESServiceID:pesServicedId },
        function (data) {
            document.location.hash = "?guid=" +$("#txtGuid").val();
            var pathArray = unescape(fullpath).split("^");
            var path = "";
            $.each(pathArray, function (key, value) {
                path += value + "\\";
            });
            var rowList = $.parseJSON(data);
            var rowLength = rowList.length;
            if (rowLength < 1) {
                $("#detailsView").html("<span class='org_box_cor cor1'></span><div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down' id='closeDetails'></div></div><p style='text-align:center; vertical-align:middle; color:#ffffff'>There's no details data.</p>");
                $("#detailsView").css("height", height);
                CloseDetailsBinding();
                return;
            }
            var displayItem = 1;
            if (rowLength >= 8) {
                displayItem = 8;
            }
            else {
                displayItem = rowLength;
            }
            $("#detailsView").css("height", (114 + (31 * displayItem)));
            var contentString = "";
            for (var i = 0; i < rowLength; i++) {
                var ServiceRequestNumber;
                var result;
                
                if (rowList[i]["ServiceRequestNumber"] == -1) {
                    ServiceRequestNumber = NaN;
                }
                else {
                    ServiceRequestNumber = rowList[i]["ServiceRequestNumber"];
                }
                result = rowList[i]["Result"];

                contentString += "<tr><td width='40%' name='ServiceRequestNumber'>" + ServiceRequestNumber  + "</td><td width='60%'>" + result + "</td></tr>";

            }

            $("#detailsView").html("<span class='org_box_cor cor1'></span><div class='nestedHeader'>" +
                                   "<a href='#CSTC' class='nestedFunctionFront' id='CopySR' onclick='copySR();'>Copy SR to Clipboard</a><a style='display:none;'>" +
                                   "CSTC</a><a href='#ETE' class='nestedFunction' id='DetailsExport' >Export to Excel</a><a style='display:none;'>" +
                                   "ETE</a><div class='triangle-down' id='closeDetails'></div>" +
                                   "<table class='headertable' id='headertable'><thead><tr class='nestedtableHeader'><td width='40%'>Request Number</td>" +
                                   "<td width='60%'>Result</td></tr></thead></table></div>" +
                                   "<div  class='nestedtableDiv' id='nestedtableDiv'><table class='nestedtable' id='nestedtable1'>" + contentString + "</table></div>");
            CloseDetailsBinding();
            if (rowLength <= 8) {
                $(".nestedtableDiv").css("width", 538);
            }
            if (displayItem < 8) {
                $(".nestedtableDiv").css("height", 1 + (31 * displayItem));
            }
            $('#nestedtable1').tableUI();
            exportDetailsView();

            // Prepare State data.

            var commProL2ID=$("#txtCommercialProductLevel2ID").val();
            var quaters=$("#txtQuaters").val();
            var region=$("#txtRegionHidden").val();
            var taxonomy = $("#taxonomyHidden").val();
            var taxonomySelected = $("#txtTaxonomyHidden").val();
            var rankType= $('input[type="radio"][name="rank"]:checked').val();
            var audienceView="";

            if(isTreeOrProView.toLocaleLowerCase()=="proview")
            {
                var avlist = $('input[type="radio"][name="av"]:checked');
                if(avlist.length >0) {
                    audienceView = avlist.attr("id");    
                }
            }
            var productLevel1 = $("#ProLevel1HiddenP").val();
            var productLevel2 = $("#ProLevel2HiddenP").val();
            var productLevel3 = $("#ProLevel3HiddenP").val();

            var offeringLevel1=$("#OffLevel1HiddenP").val();
            var offeringLevel2=$("#OffLevel2HiddenP").val();
            var offeringLevel3=$("#OffLevel3HiddenP").val();

            var cusRegLevel1=$("#CusRegLevel1HiddenP").val();
            var cusRegLevel2=$("#CusRegLevel2HiddenP").val();
            var cusRegLevel3=$("#CusRegLevel3HiddenP").val();

            SavePageStatusTopissue(commProL2ID, quaters, "", region, rankType, "", audienceView, "", "", "", "", "", "",
                rankType, "DrilldownForSurVol", "TopIssue", isTreeOrProView, productLevel1, productLevel2, productLevel3, path,"","","","","","",offeringLevel1,offeringLevel2,offeringLevel3,"","","","","","",cusRegLevel1,cusRegLevel2,cusRegLevel3);
        });
}

    function len(o) {
        var s, l = 0, c;
        for (i = 0; i < o.length; i++) {
            var c = o.charAt(i);
            if (c.charCodeAt(0) >= 128) {
                l += 2;
            }
            else {
                l += 1;
            }
        }
        return l;
    }

    function exportDetailsView() {
        $("#DetailsExport").click(function () {
            var exportButton = $("#DetailsExport");
            var host = getHostUrl();
            exportButton.attr("disabled", "disabled");
            $.ajax({
                url:host+ "/ExportDetailsView.srv",
                //data: { type: type },
                cache: false,
                success: function (result) {
                    if (result == '"-1"') {
                        $("#warningTitle").html("Export Excel Warning :");
                        $("#warningText").html("No data selected, please run the report first.");
                        $(".warning").overlay().load();
                    }
                    else if (result == '"0"') {
                        $("#warningTitle").html("Export Excel Warning :");
                        $("#warningText").html("Report columns is 0, please run the report again.");
                        $(".warning").overlay().load();
                    }
                    else {
                        $('#iframe').attr('src', 'ExportDetailsView.srv');
                        $('#iframe').load();
                    }
                    exportButton.removeAttr("disabled");
                },
                error: function (result) {
                    alert("error");
                    exportButton.removeAttr("disabled"); 
                }
            });

        });
    }

var TimeFlag;
var t = 0;

    function DrillDownTrending(trendID, title, s1, datediff, Xlabor) {
        var ymax = 0;
        $.each(s1, function (key, value) {
            if (parseInt(ymax) < parseInt(value[1])) {
                ymax = parseInt(value[1]);
            }
        });
        ymax = parseInt(ymax) + 5;
        var intervalTick = parseInt(ymax / 5);
        intervalTick += 1;
        ymax = intervalTick * 5;
        plot1 = $.jqplot(trendID, [s1], {
            title: title,
            // Turns on animatino for all series in this plot.        
            animate: true,
            // Will animate plot on calls to plot1.replot({resetAxes:true})       
            animateReplot: true,
            cursor: {
                show: true,
                zoom: true,
                looseZoom: true,
                showTooltip: false
            },
            axesDefaults: {        
//                tickRenderer: $.jqplot.CanvasAxisTickRenderer,        
//                tickOptions: {          
//                    angle: -50,          
//                    fontSize: '10pt'        
//                }   
                //pad: 0
                
            },
            axes: {
                // These options will set up the x axis like a category axis.            
                xaxis: {
                    //renderer: $.jqplot.CategoryAxisRenderer
                    renderer: $.jqplot.CategoryAxisRenderer,
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                    tickOptions: {
                        angle: -50,
                        fontSize: '10pt'
                    }
                },
                yaxis: {
                    max: ymax,
                    min: 0,
                    tickInterval: intervalTick,      
                    label: Xlabor,
                    labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                    labelOptions: {
                        show: true,
                        fontSize: '10pt'
                    }
                }
            },
//            series:[{renderer:$.jqplot.BarRenderer}],
            seriesColors: ["#4F81BD"],
            highlighter:
                {
                    show: true,
                    showLabel: true,
                    tooltipAxes: 'y',
                    tooltipOffset: 2,
                    tooltipSeparator: 'Volume:',
                    sizeAdjust: 7.5
                }
        });
    }

    var flag = true;
    function getTrendingData(SupportTopicDerivedID, level2,fullPath,laborP,labor,TMPI,CaseVolumeP,CaseVolume,TB,BB,totalB,type, Xlabor,trendID, title) {
        var host = getHostUrl();
        var supportTopicDerivedID = SupportTopicDerivedID;
        var GeographyLevel3 = $("#txtRegionDetails").val();
        var Quaters = $("#txtQuaters").val();
        var CommercialProductLevel2Name = level2;
        var type = type;
        var pesServicedId = $("#copyPESServicedID").val();
        var productVersion = $("#copyProductVersion").val();
        var customerGeography = $("#copyCusGeoDerivedID").val();
        var host = getHostUrl();
        $.post(host + "/GetTrendingData.srv",
        { supportTopicDerivedID: supportTopicDerivedID,
        GeographyLevel3: GeographyLevel3, Quaters: Quaters, CommercialProductLevel2Name: productVersion, type: type, PESServiceID: pesServicedId, CustomerGeography: customerGeography
        },
        function (data) {
                document.location.hash = "?guid=" +$("#txtGuid").val();
                var rowList = $.parseJSON(data);
                var datediff = 1;

                if (rowList.length < 1 && trendID == "trendingLaborCanvas" || !flag) {
                    $("#LaborTrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no labor trending data.</p>");
                    CloseDetailsBindingTrend();
                    return;
                }
    
                if (rowList.length < 1 && trendID == "trendingTMPICanvas" || !flag) {
                    $("#TMPITrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no TMPI trending data.</p>");
                    CloseDetailsBindingTrend();
                    return;
                }
    
                if (rowList.length < 1 && trendID == "trendingVolumeCanvas") {
                    flag=false;
                    $("#VolumeTrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no TMPI trending data.</p>");
                    $("#LaborTrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no labor trending data.</p>");
                    $("#TMPITrending").html("<p style='color:#000000;margin-left:140px; margin-top:120px;'>There's no TMPI trending data.</p>");
                    CloseDetailsBindingTrend();
                    return;
                }

                if(rowList.length > 6 && rowList<13)
                {
                    datediff = 2;
                }
                else if(rowList.length > 12 && rowList<25)
                {
                    datediff = 4;
                }
                else if(rowList.length > 24 && rowList<37)
                {
                    datediff = 8;
                }
                else if(rowList.length > 36 && rowList<49)
                {
                    datediff = 16;
                }
                else
                {
                    datediff = 32;
                }
                DrillDownTrending(trendID,title, rowList, datediff, Xlabor);
        });

    }

    function showTrendingWindow (id, Quarter, SupportTopicDerivedID, level2,fullPath,laborP,labor,TMPI,CaseVolumeP,CaseVolume,TB,BB,totalB) {
        flag = true;
        if (SupportTopicDerivedID == null) {
            $("#trendContent").html("<div style='margin-top:7.5%; margin-left:3%;'><div class='triangle-down-trend' id='closeTrend'></div></div><p style='color:#ffffff;margin-left:400px; margin-top:200px;'>There's no trending data.</p>");
            CloseDetailsBindingTrend();
        }
        else {
            var pathArray = unescape(fullPath).split("^");
            var path = "";
            $.each(pathArray, function(key, value) {
                path +=  value  + "\\";
            });
            Quarter = Quarter.replace("All,","");
            path = path.substring(0,path.length - 1);
            $("#trendContent").html("<div><div style='margin-top:5%; margin-left:3%;'><div class='triangle-down-trend' id='closeTrend'></div></div>"+
                            "<div id='trending'>Trend Analysis</div><div class=treningDetails><table><tr><td colspan='2'><b>Support Topic:</b></td></tr>"+
                            "<tr><td colspan='2' style='height:35px;vertical-align:top;line-height:15px'>" + path + "</td></tr>"+
                            "<tr><td colspan='2'><b>Time Range:</b></td></tr><tr><td colspan='2' style='height:35px;vertical-align:top;line-height:15px'>" + Quarter + 
                            "</td></tr><tr><td width='40%'><b>Labor %:</b></td><td>" + laborP + "</td></tr><tr><td><b>Labor Hours:</b></td><td>" + labor + "</td></tr><tr><td><b>AVG TMPI:</b></td><td>"
                             + TMPI + "</td><tr><tr><td><b>Volume %:</b></td><td>" + CaseVolumeP + "</td></tr><tr><td><b>Volume:</b></td><td>" + CaseVolume + 
                             "</td></tr><tr><td><b>CPE TB %:</b></td><td>" + TB + "</td></tr><tr><td><b>CPE BB %:</b></td><td>" + BB + 
                             "</td></tr><tr><td><b>Survey Total:</b></td><td>" + totalB + "</td></tr></table></div>"+
                            "<div id='trendingVolumeCanvas' class='trendingVolumeCanvas'><div id='VolumeTrending'></div></div>"+
                            "<div id='trendingLaborCanvas' class='trendingLaborCanvas'><div id='LaborTrending'></div></div>"+
                            "<div id='trendingTMPICanvas' class='trendingTMPICanvas'><div id='TMPITrending'></div></div></div>");
            $("#VolumeTrending").html("<p style='color:#000000;margin-left:180px; margin-top:120px;'>Loading...</p><img style='color:#000000;margin-left:90px; margin-top:10px;'"+
                                      " src='../../images/MetroLoading.gif' alt='calculating...' />");
            $("#LaborTrending").html("<p style='color:#000000;margin-left:180px; margin-top:120px;'>Loading...</p><img style='color:#000000;margin-left:90px; margin-top:10px;'"+
                                      " src='../../images/MetroLoading.gif' alt='calculating...' />");
            $("#TMPITrending").html("<p style='color:#000000;margin-left:180px; margin-top:120px;'>Loading...</p><img style='color:#000000;margin-left:90px; margin-top:10px;'"+
                                      " src='../../images/MetroLoading.gif' alt='calculating...' />");
            getTrendingData(SupportTopicDerivedID, level2,fullPath,laborP,labor,TMPI,CaseVolumeP,CaseVolume,TB,BB,totalB,"TopIssue","Volume (numeric)","trendingVolumeCanvas","Volume Trend");
            getTrendingData(SupportTopicDerivedID, level2,fullPath,laborP,labor,TMPI,CaseVolumeP,CaseVolume,TB,BB,totalB,"LaborTopIssue","Labor (hours)","trendingLaborCanvas", "Labor Trend");
            getTrendingData(SupportTopicDerivedID, level2,fullPath,laborP,labor,TMPI,CaseVolumeP,CaseVolume,TB,BB,totalB,"TMPITopIssue","TMPI (mins)","trendingTMPICanvas", "TMPI Trend");
        }

        // Prepare State data.

            var commProL2ID=$("#txtCommercialProductLevel2ID").val();
            var quaters=$("#txtQuaters").val();
            var region=$("#txtRegionHidden").val();
            var taxonomy = $("#taxonomyHidden").val();
            var taxonomySelected = $("#txtTaxonomyHidden").val();
            var rankType= $('input[type="radio"][name="rank"]:checked').val();
            var audienceView="";

            if(isTreeOrProView.toLocaleLowerCase()=="proview")
            {
                var avlist = $('input[type="radio"][name="av"]:checked');
                if(avlist.length >0) {
                    audienceView = avlist.attr("id");    
                }
            }
            var productLevel1 = $("#ProLevel1HiddenP").val();
            var productLevel2 = $("#ProLevel2HiddenP").val();
            var productLevel3 = $("#ProLevel3HiddenP").val();
            
            var offeringLevel1=$("#OffLevel1HiddenP").val();
            var offeringLevel2=$("#OffLevel2HiddenP").val();
            var offeringLevel3=$("#OffLevel3HiddenP").val();

            var cusRegLevel1=$("#CusRegLevel1HiddenP").val();
            var cusRegLevel2=$("#CusRegLevel2HiddenP").val();
            var cusRegLevel3=$("#CusRegLevel3HiddenP").val();

            SavePageStatusTopissue(commProL2ID, quaters, "", region, rankType, "", audienceView, "", "", "", "", "", "",
                rankType, "Trending", "TopIssue", isTreeOrProView, productLevel1, level2, productLevel3, path,"","","","","","",offeringLevel1,offeringLevel2,offeringLevel3,"","","","","","",cusRegLevel1,cusRegLevel2,cusRegLevel3);
    }



    function LoadTaxonomyBasedOnTree(){
        //$("#SP_Selection").attr("disabled", true);
        //selectedProducts = "";
        var value = $("#txtProductTreeHidden").attr("value");
        var modifiedValue = value.substring(0, value.length - 1);
        $("#txtProductTreeHidden").attr("value", modifiedValue); 
        getProductInfo();
        //$("#tree").fadeOut();
        //$("#searchDiv").fadeOut();
        //$("#productsNameList span").html("");
        //$("#productsNameList").attr("class", "");
        //$("#closeTreeDiv").fadeOut();
    }


     function ShowProductTree()
    {
        $("#searchDiv").fadeIn("slow");
        $("#matchtextbox").focus();
        $("#closeTreeDiv").fadeIn("slow");
        $("#tree").fadeIn("slow");
        $("#RegionList").hide();
        $("#TimeRangeList").css("display", "none");
        $("#divCheckBoxList").css("display", "none");
        
    }
    function ShowOfferingTree()
    {
        $("#searchOffTrDiv").fadeIn("slow");
        $("#offTrMatchTextbox").focus();
        $("#closeOfferingTreeDiv").fadeIn("slow");
        $("#offeringTree").fadeIn("slow");
        $("#RegionList").hide();
        $("#TimeRangeList").css("display", "none");
        $("#divCheckBoxList").css("display", "none");
    }
    function HideOfferingTree()
    {
        $("#searchOffTrDiv").hide();
        $("#offeringTree").hide();
        $("#closeOfferingTreeDiv").hide();
    }

    function ShowCusRegTree()
    {
        $("#searchcusRegionTreeDiv").fadeIn("slow");
        $("#cusRegionTrMatchTextbox").focus();
        $("#closecusRegionTreeDiv").fadeIn("slow");
        $("#cusRegionTree").fadeIn("slow");
        $("#RegionList").hide();
        $("#TimeRangeList").css("display", "none");
        $("#divCheckBoxList").css("display", "none");
    }
    function HideCusRegTree()
    {
        $("#searchcusRegionTreeDiv").hide();
        $("#cusRegionTree").hide();
        $("#closecusRegionTreeDiv").hide();
    }

/////////////////////////////////////////////////////////////
// Feedback module script functions.
var suspendedflag = 0;
var childFlag = true;
var currentFeedbackPageindex = 1;
$(document).ready(function () {
    var suspended = $("#availableS");
    $("#feedByTime").css("background-color", "#000000");
    $("#feedByTime").css("color", "#ffffff");
    $("#availableS").click(function () {
        if (suspendedflag == 0) {
            expand();
        } else if (suspendedflag == 1) {
            contracts();
        }
    });

    $("#availableS").mousedown(function () {
        $("#availableS").attr("class", "availableS-Focus");
    });

    $("#availableS").mouseup(function () {
        $("#availableS").attr("class", "availableS");
    });

    $("#availableS").mouseover(function () {
        $("#availableS").attr("class", "availableS-Focus");
    });

    $("#availableS").mouseout(function () {
        $("#availableS").attr("class", "availableS");
    });


    $("#txtFeedback").focus(function () {
        $("#txtFeedback").attr("class", "txtFeedback");
        if ($("#txtFeedback").val() == "Hi, TIC team...") {
            $("#txtFeedback").val("");
        }
    });

    $("#txtFeedback").focusout(function () {
        if ($("#txtFeedback").val() == "") {
            $("#txtFeedback").attr("class", "txtFeendbackNoFocus");
            $("#txtFeedback").val("Hi, TIC team...");
        }
    });

    $("#txtFeedbackComment").focus(function () {
        $("#txtFeedbackComment").attr("class", "txtFeedbackComment");
        if ($("#txtFeedbackComment").val() == "My Comments To This FeedBack...") {
            $("#txtFeedbackComment").val("");
        }
    });

    $("#txtFeedbackComment").focusout(function () {
        if ($("#txtFeedbackComment").val() == "") {
            $("#txtFeedbackComment").attr("class", "txtFeedbackCommentNoFocus");
            $("#txtFeedbackComment").val("My Comments To This FeedBack...");
        }
    });

    // Add feedback into database.
    $("#sendFeedback").click(function () {
        var feedbackText = $.trim($("#txtFeedback").val());
        var trueLength = getLen(feedbackText);
        if (feedbackText == "" || feedbackText.length == 0 || feedbackText == "Hi, TIC team...") {
            InvokeFeedbackReminder("FeedbackSucMask", "FeedbackSucMaskFont", "Please input your feedback first, thank you.",
             "sendFeedback");
        }
        //            else if (trueLength > 1000) {
        //                InvokeFeedbackReminder("FeedbackSucMask", "FeedbackSucMaskFont", "Feedback must be less than 1000 characters.",
        //             "sendFeedback");
        //            }
        else {
            AddFeedback(feedbackText);
        }
    });

    // Add comments into database.
    $("#sendComment").click(function () {
        var commentText = $.trim($("#txtFeedbackComment").val());
        var trueLength = getLen(commentText);
        if (commentText == "" || commentText.length == 0 || commentText == "My Comments To This FeedBack...") {
            InvokeCommentReminder("CommentSucMask", "CommentSucMaskFont", "Please input your comment first, thank you.",
             "sendComment");
        }
        //            else if (trueLength > 500) {
        //                InvokeCommentReminder("CommentSucMask", "CommentSucMaskFont", "Comment must be less than 500 characters.",
        //             "sendComment");
        //            }
        else {
            var feedbackid = $("#txtFeedbackID").val();
            var fAlias = $("#txtAlias").val();
            AddFeedbackComments(commentText, feedbackid, fAlias);
        }
    });

    $("#feedByTime").click(function () {
        checkFilter("feedByTime");
    });

    $("#feedByTime").mousedown(function () {
        $("#feedByTime").css("background-color", "#000000");
        $("#feedByTime").css("color", "#ffffff");
    });

    $("#feedByTime").mouseup(function () {
        $("#feedByTime").css("background-color", "#000000");
        $("#feedByTime").css("color", "#ffffff");
    });

    $("#feedByTime").mouseover(function () {
        $("#feedByTime").css("background-color", "#000000");
        $("#feedByTime").css("color", "#ffffff");
    });

    $("#feedByTime").mouseout(function () {
        if ($('#RAfeedByTime').prop("checked") != true) {
            $("#feedByTime").css("background-color", "#CD7011");
            $("#feedByTime").css("color", "#000000")
        }
    });

    $("#feedByRate").click(function () {
        checkFilter("feedByRate");
    });

    $("#feedByRate").mousedown(function () {
        $("#feedByRate").css("background-color", "#000000");
        $("#feedByRate").css("color", "#ffffff");
    });

    $("#feedByRate").mouseup(function () {
        $("#feedByRate").css("background-color", "#000000");
        $("#feedByRate").css("color", "#ffffff");
    });

    $("#feedByRate").mouseover(function () {
        $("#feedByRate").css("background-color", "#000000");
        $("#feedByRate").css("color", "#ffffff");
    });

    $("#feedByRate").mouseout(function () {
        if ($('#RAfeedByRate').prop("checked") != true) {
            $("#feedByRate").css("background-color", "#CD7011");
            $("#feedByRate").css("color", "#000000");
        }
    });

    $("#backContent").click(function () {
        ViewCommentsByFeedbackID("", "", "", "", "", "left");
    });

    $("#backContent").mousedown(function () {
        $("#triangle-left").attr("class", "triangle-left-onfocus");
        $("#triangle-left-core").attr("class", "triangle-left-core-onfocus");
    });

    $("#backContent").mouseup(function () {
        $("#triangle-left").attr("class", "triangle-left");
        $("#triangle-left-core").attr("class", "triangle-left-core");
    });

    $("#backContent").mouseover(function () {
        $("#triangle-left").attr("class", "triangle-left-onfocus");
        $("#triangle-left-core").attr("class", "triangle-left-core-onfocus");
    });

    $("#backContent").mouseout(function () {
        $("#triangle-left").attr("class", "triangle-left");
        $("#triangle-left-core").attr("class", "triangle-left-core");
    });

    $("#feedbacktriangleup").click(function () {
        if ($("#feedbackvotevolume").attr("class") == "voteVolume") {
            var feedbackid = $("#txtFeedbackID").val();
            var volume = $("#feedbackvotevolume").html();
            AddFeedbackRate(feedbackid, volume, "test");
            $("#feedbackvotevolume").html("");
            $("#feedbackvotevolume").html(parseInt(volume) + 1);
            $("#feedbackvotevolume").attr("class", "voteVolumeDis");
            $("#feedbacktriangleup").attr("class", "triangle-up-dis");
        }
    });
});


function contracts() {
    var combox = $("#common_box");
    var width = combox.width();
    if (width == 350 && suspendedflag == 1) {
        //
        combox.animate({ width: "35px" }, 500, function () {
            $("#content").hide();
        });
        suspendedflag = 0;
    } else {

    }
}


function expand() {
    var combox = $("#common_box");
    var width = combox.width();
    if (childFlag == true) {
        $("#FeedbackMask").fadeTo(500, 0.25);
    }
    if (width == 35 && suspendedflag == 0) {
        $("#content").show();
        combox.animate({ width: "350px" }, 500, function () {
            var radioSelected = $('input:radio[name="feedback"]:checked');
            if (currentFeedbackPageindex == 1) {
                LoadFeedback(currentFeedbackPageindex, 5, true, radioSelected.val());
            }
            else {
                LoadFeedback(currentFeedbackPageindex, 5, false, radioSelected.val());
            }
        });
        suspendedflag = 1;
    } else {

    }
}

function checkFilter(spanid) {
    var radios = $('input:radio[name="feedback"]');
    $.each(radios, function () {
        $(this).prop("checked", false);
        var thisID = $(this).attr("tag");
        $("#" + thisID).css("background-color", "#CD7011");
        $("#" + thisID).css("color", "#000000");
    });
    $("#RA" + spanid).prop("checked", true);
    $("#" + spanid).css("background-color", "#000000");
    $("#" + spanid).css("color", "#ffffff");
    var radioSelected = $('input:radio[name="feedback"]:checked');
    $("#FeedbackMask").fadeTo(500, 0.25);
    currentFeedbackPageindex = 1;
    LoadFeedback(1, 5, true, radioSelected.val());
}

function LoadFeedback(PageIndex, PageSize, IsInit, OrderType) {
    var host = getHostUrl();
    $.post(host + "/ViewFeedbackContent.srv",
        { PageIndex: PageIndex, PageSize: PageSize, OrderType: OrderType },
        function (data) {
            //document.location.hash = "?guid=" + $("#txtGuid").val();
            var rowList = $.parseJSON(data);
            if (rowList["AllFeedbackContent"] == undefined && data.length == 65) {
                $(".feedbackTable").html("");
                $(".feedbackTable").html("<tr><td>No feedbacks.</td></tr>");
                $("#FeedbackMask").hide();
                return false;
            }
            var totalRecord = rowList["TotalFeedbackNum"];
            var totalPageNum = rowList["TotalPageNum"];
            if (IsInit) {
                LoadFeedbackStructure(totalRecord, totalPageNum);
            }

            if (totalPageNum == 1) {
                $("#paging span").attr("style", "margin-top:5px");
                $("#paging div.short").attr("style", "margin-top:15px");
            }
            if (totalPageNum == 2) {
                $("#paging ul li a").css("width", 15);
                $("#paging div.short").css("margin-top", 15);
            }
            if (totalPageNum > 2) {
                $("#paging ul li a").css("width", 15);
                $("#paging div.short").css("margin-top", 15);
            }

            var FeedbackList = rowList["AllFeedbackContent"];
            OrganizeFeedbackCode(FeedbackList);
        });
}

function LoadFeedbackStructure(totalRecord, totalPageNum) {
    $('#paging').smartpaginator({
        totalrecords: totalRecord,
        recordsperpage: 5,
        controlsalways: true,
        datacontainer: 'feedbackTable',
        dataelement: 'tr',
        initval: 0,
        next: 'Next',
        prev: 'Prev',
        first: 'First',
        last: 'Last',
        theme: 'mssolve',
        onchange: function (newPage) {
            $("#FeedbackMask").fadeTo(500, 0.25);
            // onchange event.
            if (totalPageNum == 1) {
                $("#paging span").attr("style", "margin-top:5px");
                $("#paging div.short").attr("style", "margin-top:15px");
            }
            if (totalPageNum == 2) {
                $("#paging ul li a").css("width", 15);
                $("#paging div.short").css("margin-top", 15);
            }
            if (totalPageNum > 2) {
                $("#paging ul li a").css("width", 15);
                $("#paging div.short").css("margin-top", 15);
            }
            var radioSelected = $('input:radio[name="feedback"]:checked');
            currentFeedbackPageindex = newPage;
            LoadFeedback(newPage, 5, false, radioSelected.val());
        }
    });
}

function OrganizeFeedbackCode(FeedbackList) {
    var feedbackHtml = "";

    for (var i = 0; i < FeedbackList.length; i++) {
        var canVote = FeedbackList[i]["CanVote"];
        var voteClassName = "triangle-up";
        var fontClassName = "voteVolume";
        if (canVote == "0") {
            voteClassName = "triangle-up-dis";
            fontClassName = "voteVolumeDis";

        }
        //triangle-up-dis
        var content = FeedbackList[i]["FeedBackDetailsContent"];
        var displayContent = "";
        var transformContent = "";
        if (content.length > 95) {
            displayContent = subString(content, 95);
            displayContent += "...";
        }
        else {
            displayContent = content;
        }
        transformContent = content.replace(/'/g, "");
        transformContent = transformContent.replace(/"/g, "");
        transformContent = encodeURIComponent(transformContent);

        feedbackHtml += "<tr><td><table class='itemTable'><tr><td height='67px'  onclick='ViewCommentsByFeedbackID(\"" +
                        FeedbackList[i]["FeedbackID"] + "\", 1, 3, true, \"" + transformContent + "\",\"right\", " + i + " ,\"" + FeedbackList[i]["Alias"] + "\", \"" +
                        FeedbackList[i]["CreatedTime"] + "\");'><div style='color:#b9a862;font-size:13px;margin-top:5px;'>" + FeedbackList[i]["Alias"] +
                       " said:</div> <div style='color:#b9a862;font-size:13px;text-align:right;margin-top:-12px;'>" + FeedbackList[i]["CreatedTime"] + "</div><br /><span style='color:#ffffff;font-size:13px;'>" + displayContent +
                       "</span></td></tr><tr><td height='15px' style='border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgb(138,139,125);'>" +
                       "<div class='CommentsCountDiv'  onclick='ViewCommentsByFeedbackID(\"" +
                        FeedbackList[i]["FeedbackID"] + "\", 1, 3, true, \"" + transformContent + "\",\"right\", " + i + " ,\"" + FeedbackList[i]["Alias"] + "\", \"" +
                        FeedbackList[i]["CreatedTime"] + "\");'>Comments(<span>" + FeedbackList[i]["CommentsCount"] + "</span>)  > ></div><div class='Morefeed'><div id='voteDIV" + i + "' class='" + voteClassName + "' onclick='AddFeedbackRate(\"" +
                       FeedbackList[i]["FeedbackID"] + "\", \"" + FeedbackList[i]["Rate"] + "\", \"" + i + "\");'></div>" +
                       "<div class='" + fontClassName + "' id='vote" + i + "'>" + FeedbackList[i]["Rate"] + "</div></div></td></tr></table></td></tr>";

    }
    $(".feedbackTable").html("");
    $(".feedbackTable").html(feedbackHtml);
    $("#FeedbackMask").hide();
}

function ViewCommentsByFeedbackID(FeedbackID, PageIndex, PageSize, IsInit, CommentsDetails, Direction, Voteid, Alias, Time) {
    if (childFlag && Direction == "right") {
        $("#child1").animate({ marginLeft: "-320px" }, 500);
        $("#child2").animate({ marginLeft: "0px" }, 500, function () {
            $("#CommentMask").fadeTo(500, 0.25);
            LoadFeedbackComments(FeedbackID, PageIndex, PageSize, true);
        });
        childFlag = !childFlag;
        $("#txtFeedbackID").val(FeedbackID);
        $("#txtAlias").val(Alias);
        var CanVote = $("#vote" + Voteid).attr("class");
        if (CanVote == "voteVolume") {
            $("#feedbacktriangleup").attr("class", "triangle-up");
            $("#feedbackvotevolume").attr("class", "voteVolume");
        }
        else {
            $("#feedbacktriangleup").attr("class", "triangle-up-dis");
            $("#feedbackvotevolume").attr("class", "voteVolumeDis");
        }
        $("#feedbackvotevolume").html("");
        $("#feedbackvotevolume").html($("#vote" + Voteid).html());
        $("#feedbackusername").html("");
        $("#feedbackusername").html(Alias);
        $("#feedbackdatetime").html("");
        $("#feedbackdatetime").html(Time);
        $("#feedbackcontent").html("");
        var content = decodeURIComponent(CommentsDetails);
        $("#feedbackcontent").html(content);
    }
    else if (!childFlag && Direction == "left") {
        $("#child1").animate({ marginLeft: "0px" }, 500);
        $("#child2").animate({ marginLeft: "330px" }, 500, function () {
            $("#FeedbackMask").fadeTo(500, 0.25);
            var radioSelected = $('input:radio[name="feedback"]:checked');
            LoadFeedback(currentFeedbackPageindex, 5, false, radioSelected.val());
        });
        childFlag = !childFlag;

    }
}

function LoadFeedbackComments(FeedbackID, PageIndex, PageSize, IsInit) {
    var host = getHostUrl();
    $.post(host + "/ViewFeedbackComments.srv",
        { FeedbackID: FeedbackID, PageIndex: PageIndex, PageSize: PageSize },
        function (data) {
            //document.location.hash = "?guid=" + $("#txtGuid").val();
            var rowList = $.parseJSON(data);
            if (rowList.length < 1) {
                return false;
            }
            var totalRecord = rowList["TotalFeedbackNum"];
            var totalPageNum = rowList["TotalPageNum"];

            if (IsInit) {
                LoadFeedbackCommentsStructure(FeedbackID, totalRecord, totalPageNum);
            }

            if (totalPageNum == 1) {
                $("#pagingComment span").attr("style", "margin-top:5px");
                $("#pagingComment div.short").attr("style", "margin-top:15px");
            }
            if (totalPageNum == 2) {
                $("#pagingComment ul li a").css("width", 15);
                $("#pagingComment div.short").css("margin-top", 15);
            }
            if (totalPageNum > 2) {
                $("#pagingComment ul li a").css("width", 15);
                $("#pagingComment div.short").css("margin-top", 15);
            }

            var CommentList = rowList["AllFeedbackComment"];
            OrganizeFeedbackCommentsCode(CommentList);
        });
}

function LoadFeedbackCommentsStructure(FeedbackID, totalRecord, totalPageNum) {
    $('#pagingComment').smartpaginator({
        totalrecords: totalRecord,
        recordsperpage: 3,
        controlsalways: true,
        datacontainer: 'commentTable',
        dataelement: 'tr',
        initval: 0,
        next: 'Next',
        prev: 'Prev',
        first: 'First',
        last: 'Last',
        theme: 'mssolve',
        onchange: function (newPage) {
            // onchange event.
            if (totalPageNum == 1) {
                $("#pagingComment span").attr("style", "margin-top:5px");
                $("#pagingComment div.short").attr("style", "margin-top:15px");
            }
            if (totalPageNum == 2) {
                $("#pagingComment ul li a").css("width", 15);
                $("#pagingComment div.short").css("margin-top", 15);
            }
            if (totalPageNum > 2) {
                $("#pagingComment ul li a").css("width", 15);
                $("#pagingComment div.short").css("margin-top", 15);
            }
            currentFeedbackCommentPageIndex = newPage;
            $("#CommentMask").fadeTo(500, 0.25);
            LoadFeedbackComments(FeedbackID, newPage, 3, false);
        }
    });
}

function OrganizeFeedbackCommentsCode(CommentList) {
    if (CommentList == null) {
        $(".commentTable").html("");
        $(".commentTable").html("<tr><td>No comments</td></tr>");
        $("#CommentMask").hide();
        return false;
    }
    var commentHtml = "";

    for (var i = 0; i < CommentList.length; i++) {

        //triangle-up-dis
        var content = CommentList[i]["Comments"];

        commentHtml += "<tr><td><table class='itemTable'><tr><td height='82px' style='border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:rgb(0,0,0);'><div style='color:#b9a862;font-size:13px;margin-top:2px;'>" +
                        CommentList[i]["Alias"] + " said: </div><div style='color:#b9a862;font-size:13px;text-align:right;margin-top:-12px;'>(" + CommentList[i]["CreatedTime"] + ")</div><br /><textarea readonly='readonly' class='otherCommentTextarea'>" +
                       content + "</textarea></td></tr></table></td></tr>";

    }
    $(".commentTable").html("");
    $(".commentTable").html(commentHtml);
    $("#CommentMask").hide();
}

function AddFeedback(FeedBackDetailsContent) {
    var host = getHostUrl();
    $("#FeedbackSucMask").fadeTo(500, 0.25);
    $(".FeedbackSucMaskFont").html("");
    $(".FeedbackSucMaskFont").html("Sending...");
    $("#sendFeedback").prop('disabled', 'disabled');
    $.post(host + "/AddFeedBackContent.srv",
        { FeedBackDetailsContent: FeedBackDetailsContent },
        function (data) {
            if (data == "error") {
                InvokeFeedbackReminder("FeedbackSucMask", "FeedbackSucMaskFont", "Send Faild. Please contactTIC Team.", "sendFeedback");
            }
            else {
                InvokeFeedbackReminder("FeedbackSucMask", "FeedbackSucMaskFont", "Send Success.", "sendFeedback");

                $("#FeedbackMask").fadeTo(500, 0.25);
                var radioSelected = $('input:radio[name="feedback"]:checked');
                LoadFeedback(1, 5, true, radioSelected.val());
            }
        });
}

function InvokeFeedbackReminder(MaskId, fontClass, reminderText, referenceButtonid) {
    $("#" + MaskId).fadeTo(500, 0.25);
    $("." + fontClass).html("");
    $("." + fontClass).html(reminderText);
    $("#" + referenceButtonid).prop('disabled', 'disabled');
    setTimeout(function closeMask() {
        $("#" + MaskId).hide();
        $("#" + referenceButtonid).removeAttr('disabled', 'disabled');
    }, 2000);
}

function InvokeCommentReminder(MaskId, fontClass, reminderText, referenceButtonid) {
    $("#" + MaskId).fadeTo(500, 0.25);
    $("." + fontClass).html("");
    $("." + fontClass).html(reminderText);
    $("#" + referenceButtonid).prop('disabled', 'disabled');
    setTimeout(function closeMask() {
        $("#" + MaskId).hide();
        $("#" + referenceButtonid).removeAttr('disabled', 'disabled');
    }, 2000);
}

function AddFeedbackRate(FeedbackId, CurrentVoteNum, Voteid) {
    var host = getHostUrl();
    $.post(host + "/AddFeedBackRate.srv",
        { FeedbackId: FeedbackId },
        function (data) {
            if (data == "error") {
                $("#warningTitle").html("Rate Feedback");
                $("#warningText").html("Rate Failed. Please contact TIC team.");
                $(".warning").overlay().load();
            }
            else if (data == "0") {
                $("#vote" + Voteid).html("");
                $("#vote" + Voteid).html(parseInt(CurrentVoteNum) + 1);
                $("#vote" + Voteid).attr("class", "voteVolumeDis");
                $("#voteDIV" + Voteid).attr("class", "triangle-up-dis");
            }
            //        else {
            //            $("#warningTitle").html("Rate Feedback");
            //            $("#warningText").html("You've voted it or you cant vote your feedback.");
            //            $(".warning").overlay().load();
            //        }
        });
}

function AddFeedbackComments(Comment, FeedBackID, FAlias) {
    var host = getHostUrl();
    $.post(host + "/AddFeedBackComment.srv",
        { Comment: Comment, FeedBackID: FeedBackID, FAlias: FAlias },
        function (data) {
            if (data == "error") {
                InvokeCommentReminder("CommentSucMask", "CommentSucMaskFont", "Send Faild. Please contactTIC Team.",
             "sendComment");
            }
            else {
                InvokeCommentReminder("CommentSucMask", "CommentSucMaskFont", "Send Success.",
             "sendComment");

                $("#CommentMask").fadeTo(500, 0.25);
                LoadFeedbackComments(FeedBackID, 1, 3, true);
            }
        });
}



//////////////////////////////////////////////////////////
