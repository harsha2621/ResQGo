package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cdac.dao.BillDao;
import com.cdac.dao.BookingDao;
import com.cdac.dto.ApiResponse;
import com.cdac.dto.BillReqDTO;
import com.cdac.dto.BillRespDTO;
import com.cdac.entities.Bill;
import com.cdac.entities.Booking;
import com.cdac.exception.ResourceNotFoundException;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class BillServiceImpl implements BillService {

    private final BillDao billDao;
    private final BookingDao bookingDao;
    private final ModelMapper modelMapper;

    @Override
    public BillRespDTO addBill(BillReqDTO dto) {
        Booking booking = bookingDao.findById(dto.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + dto.getBookingId()));

        Bill bill = new Bill();
        bill.setBooking(booking);
        bill.setAmount(dto.getAmount());
        bill.setPaid(dto.isPaid());
        bill.setPaymentDate(dto.getPaymentDate());

        return modelMapper.map(billDao.save(bill), BillRespDTO.class);
    }

    @Override
    public BillRespDTO updateBill(Long id, BillReqDTO dto) {
        Bill bill = billDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found with ID: " + id));

        Booking booking = bookingDao.findById(dto.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + dto.getBookingId()));

        bill.setBooking(booking);
        bill.setAmount(dto.getAmount());
        bill.setPaid(dto.isPaid());
        bill.setPaymentDate(dto.getPaymentDate());

        return modelMapper.map(billDao.save(bill), BillRespDTO.class);
    }

    @Override
    public ApiResponse deleteBill(Long id) {
        Bill bill = billDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found with ID: " + id));
        billDao.delete(bill);
        return new ApiResponse("Bill deleted successfully");
    }

    @Override
    public BillRespDTO getBillById(Long id) {
        Bill bill = billDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bill not found with ID: " + id));
        return modelMapper.map(bill, BillRespDTO.class);
    }

    @Override
    public List<BillRespDTO> getAllBills() {
        return billDao.findAll().stream()
                .map(bill -> modelMapper.map(bill, BillRespDTO.class))
                .collect(Collectors.toList());
    }
}
