package com.cdac.service;

import java.util.List;

import com.cdac.dto.ApiResponse;
import com.cdac.dto.BillReqDTO;
import com.cdac.dto.BillRespDTO;

public interface BillService {

    BillRespDTO addBill(BillReqDTO dto);

    BillRespDTO updateBill(Long id, BillReqDTO dto);

    ApiResponse deleteBill(Long id);

    BillRespDTO getBillById(Long id);

    List<BillRespDTO> getAllBills();
}
