--------------------------------------------------------
--  File created - Thursday-January-23-2025   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table USERS
--------------------------------------------------------

  CREATE TABLE "TODOPROJECT"."USERS" 
   (	"ID" NUMBER, 
	"USERNAME" VARCHAR2(255 BYTE), 
	"PASSWORD" VARCHAR2(255 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into TODOPROJECT.USERS
SET DEFINE OFF;
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (34,'sasa','sasa');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (35,'we','we');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (25,'arsi33','333');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (33,'qq','qq');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (5,'test2','$2a$10$c4RRMVOdqzW10kXomy0yfOsn0bNvDORbCoYkXRI0BT7RM0hpi.1pa');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (9,'test3','$2a$10$B1b3sork8p2NNfQ0a5OYHugPsnfl2gNu85HA5hqILIxdDKR58pFwu');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (12,'test4','$2a$10$dMnssRELp/FETuYFMdvOneeaCbDyX2bq64eGDENfrgf.bBMWCDtNy');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (17,'test6','$2a$05$w.Fv5vnSAnnLrcd4rEhkku6xoHkueLfhHJB4aBb/MqGxoXNDoT2bW');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (19,'test8','$2a$05$h.KGl19nZGIjRMGRpWlcW.LK6UtUc8ypJzr5obn2zwxi59fnAxgrS');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (21,'test7','$2a$05$OVhMT/I3inEUdhNGNB7lbeo6d3w9gFJn7qFlCChjLHTrXwH.zE80m');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (23,'test10','$2a$05$PEE8emt8qKyo9B89zjog.eWxp3C4RhcUpHY0zuyPzyzCo8Ugo04YG');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (24,'test11','$2a$05$fY8CK2sW4eMvoE.66pe4ueKwQW.hBHI7Qj5uOMxTyNS6Onqa5L27y');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (3,'test1','$2a$10$AvBvmZbeu8gRVyjwx.Bhau2qtjKmnSYyYvdSiBzXWi0VW8Yye9UD.');
Insert into TODOPROJECT.USERS (ID,USERNAME,PASSWORD) values (13,'test5','$2a$10$6H6LlJDMQgqdYU7gcnEQNO9RkBGoVbZfT7.bpe.WIrF8WvHh0ahri');
--------------------------------------------------------
--  DDL for Index SYS_C0011586
--------------------------------------------------------

  CREATE UNIQUE INDEX "TODOPROJECT"."SYS_C0011586" ON "TODOPROJECT"."USERS" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index SYS_C0011587
--------------------------------------------------------

  CREATE UNIQUE INDEX "TODOPROJECT"."SYS_C0011587" ON "TODOPROJECT"."USERS" ("USERNAME") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table USERS
--------------------------------------------------------

  ALTER TABLE "TODOPROJECT"."USERS" MODIFY ("USERNAME" NOT NULL ENABLE);
 
  ALTER TABLE "TODOPROJECT"."USERS" MODIFY ("PASSWORD" NOT NULL ENABLE);
 
  ALTER TABLE "TODOPROJECT"."USERS" ADD PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
 
  ALTER TABLE "TODOPROJECT"."USERS" ADD UNIQUE ("USERNAME")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
