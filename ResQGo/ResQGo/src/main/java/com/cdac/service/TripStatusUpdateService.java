package com.cdac.service;

import com.cdac.dto.TripStatusUpdateReqDTO;
import com.cdac.dto.TripStatusUpdateRespDTO;
import java.util.*;

public interface TripStatusUpdateService {
    TripStatusUpdateRespDTO addTripStatusUpdate(TripStatusUpdateReqDTO dto);
    
    List<TripStatusUpdateRespDTO> getStatusUpdatesByBooking(Long bookingId);
    
    TripStatusUpdateRespDTO updateTripStatus(Long tripStatusId, TripStatusUpdateReqDTO dto);

    

}

