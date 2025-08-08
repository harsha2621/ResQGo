package com.cdac.security;




import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cdac.entities.Bill;
import com.cdac.dto.BillRespDTO;

@Configuration
public class ModelMapperConfig {

 @Bean
 public ModelMapper modelMapper() {
     ModelMapper modelMapper = new ModelMapper();

     // 🔁 Custom mapping for Bill → BillRespDTO
     TypeMap<Bill, BillRespDTO> typeMap = modelMapper.createTypeMap(Bill.class, BillRespDTO.class);
     typeMap.addMapping(src -> src.getBooking().getId(), BillRespDTO::setBookingId);

     return modelMapper;
 }
}
